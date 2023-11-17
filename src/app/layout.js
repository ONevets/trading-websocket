import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Websocket Trading',
  description: 'Websocket Trading with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='icon.ico'/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
