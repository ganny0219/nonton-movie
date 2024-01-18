"use client";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect } from "react";

function GoogleAnalytic() {
  // const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     //@ts-ignore
  //     window.gtag("config", "G-TJNG0J9X6K", {
  //       page_path: url,
  //     });
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);
  return (
    <Script id="ganalytic-func" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TJNG0J9X6K');
    `}
    </Script>
  );
}

export default GoogleAnalytic;
