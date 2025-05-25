import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppBar from "./components/appBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Fish",
  description:
    "Dr. Fish is an innovative aquaculture startup specializing in AI-powered IoT solutions designed specifically for Nepal's fish farming industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased  min-h-screen`}>
        <div className="mx-auto max-w-[25rem] min-h-screen bg-[#181f27] shadow-lg flex flex-col relative  border border-[#232b36]">
          <main className="">
            {children}
          </main>
         <AppBar />
        </div>
      </body>
    </html>
  );
}
