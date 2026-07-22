import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { hasValidApiKey } from "@/lib/weather";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weather Dashboard | Real-Time Weather & 5-Day Forecast",
  description: "Modern, fast, and responsive weather dashboard built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS.",
  keywords: ["Weather Dashboard", "Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "OpenWeatherMap"],
  authors: [{ name: "Senior Full Stack Next.js Developer" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isApiLive = hasValidApiKey();

  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
        {/* Glowing Mesh Ambient Background Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px]"></div>
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-indigo-700/10 rounded-full blur-[140px]"></div>
        </div>

        {/* Layout wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header hasApiKey={isApiLive} />
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
