import type { Metadata } from "next";
import { Navbar, Footer } from "@/components";
import { Toaster } from "react-hot-toast";
import "@/lib/server/database";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chat Wizards",
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
        <title>Chat Wizards</title>
        <meta name="description" content="Chat App by SDE Code Wizards" />
      </head>
      <body>
        <Toaster
          toastOptions={{
            className: "mt-14",
          }}
          position="top-right"
          reverseOrder={true}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
