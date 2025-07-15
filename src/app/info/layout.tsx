import React from 'react'
import Navigation from '@/components/site/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'


export const metadata = {
  title: 'Info Pages | Plura',
  description: 'About, Pricing, Features and Documentation'
}

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>

    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <Navigation />
      <div className="mt-4">
        {children}
      </div>
    </div>
    </ClerkProvider>
  )
}
