import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], style: 'italic', weight: '400' });

export const metadata: Metadata = {
  title: "The Rick and Morty",
  description: "The universe of Ricky and Morty",
  icons: {
    icon: [
      {
        url: '/images/favicon.svg',
        href: '/images/favicon.svg',
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
