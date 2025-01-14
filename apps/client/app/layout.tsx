import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@radix-ui/react-toast";
import { ModalProvider } from "@/providers/modal-provider";

export const metadata: Metadata = {
  title: "Virtual board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ToastProvider>
        <ModalProvider />
        <body>{children}</body>
      </ToastProvider>
    </html>
  );
}
