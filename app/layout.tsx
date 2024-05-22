import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../app/components//Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat App by SDE Code Wizards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="luxury">
      <head>
        <title>Chat App</title>
        <meta name="description" content="Chat App by SDE Code Wizards" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
