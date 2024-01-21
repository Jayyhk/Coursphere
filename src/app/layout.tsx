import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Provider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Coursphere',
  description: 'The best AI course generator!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(lexend.className, 'antialiased !overflow-y-scroll min-w-full min-h pt-16 dark:bg-zinc-900')}>
          <Provider>
            <Navbar />
            {children}
            <Toaster />
          </Provider>
        </body>
    </html>
  )
}