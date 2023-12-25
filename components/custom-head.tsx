import Head from "next/head";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  title: string;
  description: string;
  keywords: string;
};

function CustomHead({ title, description, keywords }: Props) {
  const fullUrl = process.env.NEXT_PUBLIC_BASE_URL + usePathname();
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Nonton Movie" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`}
      />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={fullUrl}></link>
    </Head>
  );
}

export default CustomHead;
