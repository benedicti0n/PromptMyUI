import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UI Cloner Prompt Maker — Turn any UI screenshot into a developer-ready design prompt",
  description:
    "Upload a UI screenshot and get a structured AI prompt that helps OpenCode, Cursor, Kimi, Claude Code, v0, Bolt, or Lovable restyle your project in the same aesthetic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        data-nav-align="center"
        data-heading-serif="true"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
