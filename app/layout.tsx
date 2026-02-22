import type { Metadata } from "next";
import { Russo_One, Inter } from "next/font/google";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import NavAuth from "@/components/NavAuth";
import Providers from "@/components/Providers";
import "./globals.css";

const russoOne = Russo_One({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CollectThe92 – Stadium Sticker Album",
  description:
    "Collect all 92 English league football grounds in a digital Panini-style sticker album.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${russoOne.variable} ${inter.variable}`}>
        <Providers>
          {/* Top nav bar – styled like a Merlin album spine */}
          <nav className="sticky top-0 z-40 merlin-nav">
            <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
              <Link href="/" className="nav-logo">
                CollectThe92
              </Link>
              <div className="hidden md:flex gap-5 text-sm items-center">
                <Link href="/about" className="nav-link">
                  About
                </Link>
                <Link href="/image-credits" className="nav-link">
                  Image Credits
                </Link>
                <Link href="/badges" className="nav-link">
                  Badges
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <NavAuth />
                <MobileNav />
              </div>
            </div>
          </nav>

          <main className="min-h-[calc(100dvh-52px)]">{children}</main>

          <footer className="merlin-footer">
            CollectThe92 – A fan project. Not affiliated with any football league or club.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
