import "./globals.css"

import type { Metadata } from "next"
import { Cal_Sans as FontHeading, Inter as FontSans } from "next/font/google"

import { ThemeProvider } from "@workspace/ui/components/theme-provider"

import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://loveui.dev"),
  title: "loveui",
  description: "loveui - the everything but AI company",  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontHeading.variable} bg-sidebar font-sans text-foreground antialiased`}
      >
        <ThemeProvider forcedTheme="dark">
          <div className="relative flex min-h-svh flex-col [--header-height:4rem] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-sidebar overflow-clip">
            <div className="absolute inset-0 z-60 pointer-events-none container before:absolute before:inset-y-0 before:-left-3 before:w-px before:bg-border/50 after:absolute after:inset-y-0 after:-right-3 after:w-px after:bg-border/50" aria-hidden="true"></div>
            <div className="fixed inset-0 pointer-events-none z-6 container before:absolute before:top-[calc(var(--header-height)-4.5px)] before:-left-[11.5px] before:z-1 before:-ml-1 before:size-2 before:rounded-[2px] before:bg-popover before:border before:border-border before:shadow-xs before:bg-clip-padding after:absolute after:-right-[11.5px] after:top-[calc(var(--header-height)-4.5px)] after:z-1 after:-mr-1 after:size-2 after:rounded-[2px] after:bg-background after:border after:border-border after:shadow-xs after:bg-clip-padding" aria-hidden="true"></div>              
            <SiteHeader />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
