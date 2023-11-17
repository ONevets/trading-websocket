import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import '@/styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Websocket Trading',
  description: 'Websocket Trading with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel='icon' href='icon.ico'/>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
