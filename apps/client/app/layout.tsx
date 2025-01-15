import { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";

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
      <ModalProvider />
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
