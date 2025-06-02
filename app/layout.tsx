import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "Pet Trial",
  description: "Pet Trial is a platform for pet lovers to try out pet adoption or owning before committing to a long-term pet ownership.",
  icons: {
    icon: [
      {
        url: "/images/logo.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: ["/images/logo.svg"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} antialiased font-kanit`}
      >
        {children}
      </body>
    </html>
  );
}
