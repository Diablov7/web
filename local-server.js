// Lightweight local server to serve static files and emulate Netlify Function
import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ? Number(process.env.PORT) : 8888;
const ROOT = __dirname;

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.webp': return 'image/webp';
    case '.svg': return 'image/svg+xml';
    case '.ico': return 'image/x-icon';
    default: return 'application/octet-stream';
  }
}

async function handleFunction(req, res) {
  // Emulate Netlify function endpoint /.netlify/functions/sendTelegram
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }
  if (req.method !== 'POST') {
    res.writeHead(405, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain; charset=utf-8'
    });
    return res.end('Method Not Allowed');
  }
  let body = '';
  req.on('data', (chunk) => { body += chunk; });
  req.on('end', () => {
    try {
      const payload = JSON.parse(body || '{}');
      // Do not call real Telegram in local mode; just echo
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
      });
      return res.end(JSON.stringify({ ok: true, echo: payload }));
    } catch (err) {
      res.writeHead(400, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
      });
      return res.end(JSON.stringify({ error: 'Bad Request', details: String(err) }));
    }
  });
}

function serveStatic(req, res) {
  let pathname = url.parse(req.url).pathname || '/';
  if (pathname.startsWith('/.netlify/functions/sendTelegram')) {
    return handleFunction(req, res);
  }
  // SPA fallback to index.html
  let filePath = path.join(ROOT, pathname);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath)) {
    // Fallback to index.html for routes
    filePath = path.join(ROOT, 'index.html');
  }
  try {
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    res.end(content);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Internal Server Error');
  }
}

const server = http.createServer(serveStatic);
server.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});


