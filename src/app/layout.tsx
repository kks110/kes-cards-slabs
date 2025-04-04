import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapClient from '../components/BootstrapClient.js';
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KES Cards Slabs",
  description: "KES Cards Slabs",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
          <link rel="icon" href="/favicon.ico"  type="image/x-icon" sizes="256x256"/>
      </head>
          <body className={inter.className}>
            {children}
            <BootstrapClient />
          </body>
      </html>
  );
}
