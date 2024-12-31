import React from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { ThemeProvider } from './ThemeContext'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Professional portfolio of Your Name - Full Stack Developer',
  openGraph: {
    title: 'Your Name - Portfolio',
    description: 'Professional portfolio of Your Name - Full Stack Developer',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 