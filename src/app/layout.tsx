import type { Metadata } from "next";

import "./styles/globals.css";
import Header from "./components/Header";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Test App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NSJYQRT54X"
        ></Script>
        <Script id="google-analytics">
          {` 
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NSJYQRT54X');
  `}
        </Script>
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
