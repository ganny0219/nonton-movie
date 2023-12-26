import Script from "next/script";
import "./globals.css";

// export const metadata = {
//   title: "Next.js",
//   description: "Generated by Next.js",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link
          href="https://vjs.zencdn.net/8.5.2/video-js.css"
          rel="stylesheet"
        /> */}
        {/* <script
          type="text/javascript"
          async={true}
          src="//s10.histats.com/js15_as.js"
        />
        // <script
        //   async
        //   src="https://www.googletagmanager.com/gtag/js?id=G-TJNG0J9X6K"
        // /> */}

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
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        {/* <link
          rel="robots"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/robots.txt`}
        /> */}
      </head>
      <body className="flex flex-col min-h-[100vh] bg-primary font-quicksand ">
        {children}
      </body>
    </html>
  );
}
