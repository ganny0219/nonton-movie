import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { PageProps } from "@/types/global";
import { generateMetaResult } from "@/utils/server-function/global";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const OfficialList = [
  "Netflix",
  "Disney+",
  "Amazon Prime",
  "HBO",
  //   "Viu",
  //   "Viva Max",
  "Apple Tv+",
  "Marvel",
  "Disney",
  "DC",
];

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const url = `/official`;
  const title =
    "Nonton Film, Movie, Box Office Terbaru dan Terlengkap Subtitle Indonesia - Moovie21";
  const description =
    "Moovie21 - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus.";
  const keywords =
    "Nonton Film, Nonton Gratis, Nonton Streaming, Moovie21, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime";
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
    // searchParams,
  });
}

function ListOfficialPage(props: PageProps) {
  return (
    <>
      <RootComponent>
        <PageContainer>
          <h1 className="text-3xl mt-4">Official</h1>
          <div className="border-b-[1px] border-solid border-[#363636] w-full my-4" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {OfficialList.map((official, index) => {
              return (
                <animateMotion
                  key={index}
                  href={`/official/${official.toLowerCase()}/page/1`}
                  className="text-start p-4 w-full bg-black rounded-md text-xl"
                >
                  {official}
                </animateMotion>
              );
            })}
          </div>
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default ListOfficialPage;
