import React, { ReactNode } from "react";
import Header from "./layouts/header";
import Footer from "./layouts/footer";
import Script from "next/script";
import { SocialMedia } from "@/types/social-media";
import ChevronUpIcon from "@/assets/icons/chevron-up";
import Image from "next/image";
import { getSocialMedia } from "@/utils/server-function/social-media";

type Props = {
  children: ReactNode;
  main?: boolean;
};

async function RootComponent({ children, main }: Props) {
  const socialMedia: SocialMedia[] = await getSocialMedia();
  // const router = useRouter();
  // const dispatch = useDispatch();
  // const [adsBlockModal, setAdsBlockModal] = useState(false);
  // const adBlockDetected = useDetectAdBlock();
  // const router = useRouter();

  // useEffect(() => {
  //   if (adBlockDetected) {
  //     setAdsBlockModal(true);
  //   }
  // }, [adBlockDetected]);

  // useEffec(() => {
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

  // const adsBlockModalClose = () => {
  //   setAdsBlockModal(false);
  //   router.refresh();
  // };

  return (
    <>
      {/* <AdsBlockWarning visible={adsBlockModal} onClose={adsBlockModalClose} /> */}
      {/* <Script
        src="https://cdn.jsdelivr.net/npm/disable-devtool@latest"
        onReady={() => {
          if (process.env.NODE_ENV === "production") {
            // @ts-ignore
            DisableDevtool({
              ondevtoolopen: () => {
                window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/404`;
              },
            });
          }
        }}
      /> */}
      {/* <Script id="histats-func" strategy="beforeInteractive">
        {`
          var _Hasync= _Hasync|| [];
          _Hasync.push(['Histats.start', '1,4812029,4,0,0,0,00010000']);
          _Hasync.push(['Histats.fasi', '1']);
          _Hasync.push(['Histats.track_hits', '']);
          `}
      </Script> */}
      <Script id="ganalytic-func" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TJNG0J9X6K');
          `}
      </Script>
      <div
        className={`${main ? "w-[95%] sm:w-[90%] xl:w-[80%]" : "w-[95%] sm:w-[90%]"
          } m-auto text-[#fff] min-h-[100vh]`}
      >
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
        <div className="flex flex-1 justify-end mt-4">
          <a
            href="#root-header"
            className="px-2 py-1 bg-[#31313180] rounded-md"
          >
            <ChevronUpIcon size="2" />
          </a>
        </div>
        <div className="px-4 sm:px-2 md:px-0 flex-col justify-center md:flex-row items-center my-6">
          <div className="text-sm md:text-base flex md:flex-1 justify-center items-center">
            {socialMedia?.map((social, socialIndex) => {
              return (
                <a
                  target="_blank"
                  href={social.url}
                  key={socialIndex}
                  className="flex flex-row items-center"
                >
                  {socialIndex != 1 && socialIndex != 0 && (
                    <div className="mx-2">|</div>
                  )}
                  {social.logoUrl != "" && (
                    <Image
                      loading="lazy"
                      title={`Nonton Movie ${social.name}`}
                      width={400}
                      height={400}
                      src={social.logoUrl}
                      alt={`Nonton Movie ${social?.name}`}
                      className="w-[16px] h-[16px] mr-2"
                    />
                  )}
                  <h2>{social.name}</h2>
                  {socialMedia.length > 1 && socialIndex == 0 && (
                    <div className="mx-2">|</div>
                  )}
                </a>
              );
            })}
          </div>
          <div className="text-xs text-center mt-2">
            Copyright © 2023 by Nonton Movie. All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
}

export default RootComponent;
