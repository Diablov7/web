import './globals.css'

export const metadata = {
  title: 'Wevolv3 - Web3 & Crypto Marketing',
  description: 'Digital Reality - Transforming Your Vision into Digital Reality',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-orbitron">
        {children}
      </body>
    </html>
  )
}

