import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Viloyat-Hub | Entrepreneurship Platform",
  description:
    "Viloyat-Hub: Empowering entrepreneurs across Uzbekistan's regions with grants, AI mentorship, and marketplace opportunities.",
  keywords: [
    "entrepreneurship",
    "grants",
    "Uzbekistan",
    "mentorship",
    "marketplace",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-background">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
