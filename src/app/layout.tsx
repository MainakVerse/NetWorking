import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Net Working",
  description: "Product Ideation, Capitalization, Assessment & Seed Funding Organization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" type="image/png" />
        {/* Optional: For different icon sizes */}
        <link rel="icon" href="/logo.png" sizes="32x32" />
        <link rel="icon" href="/logo.png" sizes="16x16" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
