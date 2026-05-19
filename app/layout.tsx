import type { Metadata } from "next";
import { Poppins, Karla } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

// Karla = closest free alternative to Centra (the font ekremkurt.com uses)
const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "Abdulkadir Akyurt — Portfolio",
  description: "ISTQB Certified Quality Engineer & Blockchain Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${karla.variable}`}>
      <body className="min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
