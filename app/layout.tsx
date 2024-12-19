import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/nav-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart CBT System",
  description: "Multifactor CBT System with Finger & Facial Recognition",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
        
          {children}
          
       
        </ThemeProvider>
      </body>
    </html>
  )
}

