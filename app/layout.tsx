import type { Metadata } from "next";
import { Navbar, Footer } from "@/components";
import "./globals.css";

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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
