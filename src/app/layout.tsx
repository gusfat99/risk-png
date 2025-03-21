import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ['400', '600', '700'], // Tambahkan berat font yang Anda gunakan
});
const plusJktSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  weight: ['400', '600', '700'], // Tambahkan berat font yang Anda gunakan
});


export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "ALTON MANAGEMENT RISK",
  description: process.env.NEXT_PUBLIC_APP_NAME || "ALTON MANAGEMENT RISK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${poppinsSans.variable} ${plusJktSans.variable}  antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
