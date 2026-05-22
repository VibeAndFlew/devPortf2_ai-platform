import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { AppProviders } from "@/providers/app-providers"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "NOVA AI Platform | Vibhanshu Buldeo",
  description: "AI-native workflow operating system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-full">
        <AppProviders>
          <Sidebar />
          <Topbar />
          <main className="pl-56 pt-14 min-h-screen">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  )
}
