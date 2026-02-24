import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlatePerform — The Athlete's International Cookbook",
  description:
    "200+ international recipes from 5 world regions. Nutritious meals for athletes and food lovers who crave bold, authentic flavors.",
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
        style={{ background: "#F5F2ED", color: "#1F1D1B" }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
