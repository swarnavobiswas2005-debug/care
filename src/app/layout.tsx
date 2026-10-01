import type { Metadata } from "next";
import { Playfair_Display, Manrope, Cormorant_Garamond, Quicksand } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "CARE | Craft A Romantic Experience",
  description: "Craft a little piece of the internet just for someone you love.",
};

import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${manrope.variable} ${cormorant.variable} ${quicksand.variable} antialiased bg-grain`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
