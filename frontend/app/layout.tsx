import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ascential: Automation Project Management Kanban Board",
  description: "Project management kanban board for Ascential automation projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
