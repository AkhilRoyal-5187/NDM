import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import { AuthProvider } from '../context/AuthContext';
import WhatsAppButton from '../components/WhatsAppButton';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discount Mithra - Your Friendly Discount Companion",
  description: "Save on Hospitals, Restaurants, Groceries, Travel & More!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          <AuthProvider>
            {children}
            <WhatsAppButton />
          </AuthProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
