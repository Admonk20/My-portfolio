import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Starfield from "@/components/Starfield";
import Aurora from "@/components/Aurora";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumen · AI Automation, Reimagined",
  description:
    "Ethereal AI automation services — agents, flows, and integrations that quietly run your business while you sleep.",
  openGraph: {
    title: "Lumen · AI Automation, Reimagined",
    description:
      "Ethereal AI automation — agents, flows, and integrations built with care.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <Aurora />
        <Starfield />
        {children}
      </body>
    </html>
  );
}
