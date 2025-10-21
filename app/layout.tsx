import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

const comicNeue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "МатМаг - Магически помощник по математика",
  description: "Помощник по математика за Искрен",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={comicNeue.className}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
