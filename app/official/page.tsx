import CustomHead from "@/components/custom-head";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import Link from "next/link";
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

function ListOfficialPage() {
  return (
    <>
      <CustomHead
        title="Nonton Film, Movie, Box Office Terbaru dan Terlengkap Subtitle Indonesia - Nonton Movie"
        description="Nonton Movie - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus."
        keywords="Nonton Film, Nonton Gratis, Nonton Streaming, Nonton Movie, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime"
      />
      <RootComponent>
        <PageContainer>
          <h1 className="text-3xl mt-4">Official</h1>
          <div className="border-b-[1px] border-solid border-[#363636] w-full my-4" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {OfficialList.map((official, index) => {
              return (
                <Link
                  key={index}
                  href={{
                    pathname: `/official/${official.toLowerCase()}/page/1`,
                  }}
                  className="text-start p-4 w-full bg-black rounded-md text-xl"
                >
                  {official}
                </Link>
              );
            })}
          </div>
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default ListOfficialPage;
