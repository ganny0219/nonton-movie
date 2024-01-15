"use client";
import Script from "next/script";
import "./globals.css";
import { redirect, useRouter, useSearchParams } from "next/navigation";

export const revalidate = 60;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serchParamsSize = useSearchParams().size;
  if (serchParamsSize) {
    return redirect(process.env.NEXT_PUBLIC_BASE_URL + "/not-found");
  }
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Moovie21" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TJNG0J9X6K"
          strategy="beforeInteractive"
        />
        {/* <Script
          src="//s10.histats.com/js15_as.js"
          strategy="beforeInteractive"
        /> */}

        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </head>
      <body className="flex flex-col min-h-[100vh] bg-primary font-quicksand ">
        {children}
      </body>
    </html>
  );
}
