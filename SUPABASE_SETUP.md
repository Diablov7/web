# Configuração do Supabase

## Passo 1: Criar conta e projeto no Supabase

1. Acesse https://supabase.com/
2. Crie uma conta (gratuita)
3. Crie um novo projeto
4. Aguarde o projeto ser criado (pode levar alguns minutos)

## Passo 2: Obter credenciais

1. No dashboard do Supabase, vá em Settings > API
2. Copie a **URL** do projeto
3. Copie a **anon/public key**

## Passo 3: Criar tabela de visualizações

No Supabase, vá em SQL Editor e execute o seguinte SQL:

```sql
-- Criar tabela de visualizações
CREATE TABLE IF NOT EXISTS post_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id TEXT NOT NULL UNIQUE,
  views INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_post_views_post_id ON post_views(post_id);
CREATE INDEX IF NOT EXISTS idx_post_views_views ON post_views(views DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de visualizações"
  ON post_views FOR SELECT
  USING (true);

-- Criar política para permitir inserção/atualização pública
CREATE POLICY "Permitir inserção/atualização pública de visualizações"
  ON post_views FOR ALL
  USING (true)
  WITH CHECK (true);

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at
CREATE TRIGGER update_post_views_updated_at
  BEFORE UPDATE ON post_views
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Passo 4: Configurar variáveis de ambiente

Adicione as credenciais no arquivo `.env`:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key
```

## Passo 5: Testar

Após configurar, o sistema de visualizações funcionará automaticamente quando alguém acessar um post do blog.

