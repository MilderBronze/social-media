import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "milder's",
  description: "Social media app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <Navbar />
        </div>
        <div className="bg-slate-100 w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          {/* myownstyles: w-full */}
          {children}
        </div>
      </body>
    </html>
  );
}