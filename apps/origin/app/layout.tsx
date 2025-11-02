import type { Metadata, Viewport } from "next"
import { Cal_Sans as FontHeading, Inter as FontSans } from "next/font/google"

import Footer from "@/components/footer"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import TopBanner from "@/components/top-banner"
import { Toaster as Sonner } from "@/registry/default/ui/sonner"
import { Toaster } from "@/registry/default/ui/toaster"

import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
})

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://loveui.dev"),
  title:
    "loveui origin - Beautiful UI components built with Tailwind CSS and React",
  description:
    "An extensive collection of copy-and-paste components for quickly building app UIs. Free, open-source, and ready to drop into your projects.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontHeading.variable} font-sans tracking-[-0.25px] antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopBanner />
          <div className="overflow-hidden px-4 has-not-data-home:before:absolute has-not-data-home:before:inset-x-0 has-not-data-home:before:h-100 has-not-data-home:before:bg-linear-to-b has-not-data-home:before:from-zinc-100 has-data-home:bg-zinc-50 supports-[overflow:clip]:overflow-clip sm:px-6 dark:has-not-data-home:before:hidden dark:has-data-home:bg-zinc-950">
            <div className="relative mx-auto w-full max-w-6xl before:absolute before:inset-y-0 before:-left-12 before:w-px before:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] after:absolute after:inset-y-0 after:-right-12 after:w-px after:bg-[linear-gradient(to_bottom,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))]">
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="grow py-12 sm:py-16">{children}</main>
                <Footer />
              </div>
            </div>
          </div>
          <Toaster />
          <Sonner />
        </ThemeProvider>
      </body>
    </html>
  )
}
