import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "../components/navbar"

import { siteConfig, getOgHomeUrl } from "@/config/site"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.avatarUrl,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [getOgHomeUrl()],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  twitter: {
    title: siteConfig.name,
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased min-h-screen font-mono`}
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-4 py-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
