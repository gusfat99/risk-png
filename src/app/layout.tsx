import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
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
  title: "Risk - Petamina GAS",
  description: "Management Risiko Petamina Gas",
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
