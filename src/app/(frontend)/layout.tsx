import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { cn } from '@/utils/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Roboto } from 'next/font/google'

import './globals.css'
import TopNavigationWrapper from '@/components/TopNavigation/TopNavigationWrapper'
import HeaderWrapper from '@/components/Header/HeaderWrapper'
import FooterWrapper from '@/components/Footer/FooterWrapper'

// Google libraries are already installed in Next JS
const roboto = Roboto({
  weight: ['300', '400', '500', '700'], // Added 300 and 400
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, roboto.variable, 'text-gray font-sans')}
      lang="en"
      suppressHydrationWarning
    >
      <head className="w-full h-auto">
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.png" rel="icon" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-dvh w-auto relative flex flex-col">
        <header className="flex flex-col">
          <TopNavigationWrapper />
          <HeaderWrapper />
        </header>
        {children}
        <FooterWrapper />
      </body>
    </html>
  )
}
