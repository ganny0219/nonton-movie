import { RootState } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

type Props = {
  url: string;
  bannerUrl: string;
};

function AdsBannerItem({ url, bannerUrl }: Props) {
  return (
    <>
      {url && bannerUrl && (
        <Link href={{ pathname: url }} target="_blank">
          <Image
            loading="lazy"
            fill
            quality={20}
            alt="banner"
            src={bannerUrl}
            className="w-full max-h-[100px] object-cover"
          />
        </Link>
      )}
    </>
  );
}

export default AdsBannerItem;
