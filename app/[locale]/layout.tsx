import type { Metadata } from "next";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";
import "../globals.css";

export const metadata: Metadata = {
  title: "Viloyat-Hub | Entrepreneurship Platform",
  description:
    "Viloyat-Hub: Empowering entrepreneurs across Uzbekistan's regions with grants, AI mentorship, and marketplace opportunities.",
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="bg-background">
      <body className="bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen bg-background">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
