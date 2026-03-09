import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import type { Metadata } from 'next'

import { cn } from '@/utils/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Roboto } from 'next/font/google'

import { mergeOpenGraph } from '@/utils/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utils/getURL'
import TopNavigationWrapper from '@/components/TopNavigation/TopNavigationWrapper'
import HeaderWrapper from '@/components/Header/HeaderWrapper'

// Google libraries are already installed in Next JS
const roboto = Roboto({
  weight: ['500', '700'], // Roboto requires explicit weights
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto', // Useful for Tailwind
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, roboto.className, 'text-gray')}
      lang="en"
      suppressHydrationWarning
    >
      <head className="w-full h-auto">
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <header className="flex flex-col">
          <TopNavigationWrapper />
          <HeaderWrapper />
        </header>
        {children}
      </body>
    </html>
  )
}

// TODO: Adjust meta
export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
