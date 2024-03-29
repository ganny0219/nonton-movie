import { RootState } from "@/store";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

type Props = {
  url: string;
  bannerUrl: string;
};

function EdsBannerItem({ url, bannerUrl }: Props) {
  return (
    <>
      {url && bannerUrl && (
        <a href={url} target="_blank">
          <Image
            loading="lazy"
            height={400}
            width={400}
            alt="banner"
            src={bannerUrl}
            className="w-full max-h-[100px] object-cover"
          />
        </a>
      )}
    </>
  );
}

export default EdsBannerItem;
