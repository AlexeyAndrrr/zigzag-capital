import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zigzag Capital — Capital for the unexpected turn",
    template: "%s · Zigzag Capital",
  },
  description:
    "Zigzag Capital is an incubation fund working across advisory, investment, and networking to turn early signals into markets.",
  keywords: [
    "Zigzag Capital",
    "incubation fund",
    "advisory",
    "investment",
    "networking",
    "web3",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: "Zigzag Capital — The future never moves in a straight line",
    description:
      "Advisory, investment, and networks for ideas before they look obvious.",
  },
  twitter: {
    card: "summary",
    title: "Zigzag Capital",
    description:
      "Capital for the unexpected turn. Advisory, investment, and networking.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
