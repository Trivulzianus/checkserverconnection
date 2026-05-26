import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Check Server Connection",
  description: "Simple HTTP reachability checker (security research honeypot)",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
