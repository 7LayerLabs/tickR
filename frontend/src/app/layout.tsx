import type { Metadata } from 'next'
import '@/styles/globals.css'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'TickR - Learn to Invest',
  description: 'Learn how to invest with real stocks, play money, and fun games designed for kids ages 12-16.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
