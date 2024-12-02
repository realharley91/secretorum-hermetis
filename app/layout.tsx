import type { Metadata } from "next";
import localFont from "next/font/local";

const departureMono = localFont({
  src: "./fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mors Pro Miseris",
  description: "The Only Way Out Is Through",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ background: 'black' }}
        className={`${departureMono.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
