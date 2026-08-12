import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { FilterProvider } from "@/context/filtercontext";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Drift Rentals — Car Rental",
  description: "Rent the right car for every kind of trip.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <FilterProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </FilterProvider>
      </body>
    </html>
  );
}
