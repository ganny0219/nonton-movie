import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { PageProps } from "@/types/global";
import { Country } from "@/types/movie";
import { getCountryList } from "@/utils/server-function/country";
import { generateMetaResult } from "@/utils/server-function/global";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

// type Props = {
//   genreList: Genre[];
// };

// const countryList = [
//   "Australia",
//   "Brazil",
//   "China",
//   "Germany",
//   "India",
//   "Italy",
//   "Japan",
//   "New Zealand",
//   "Philippines",
//   "Russia",
//   "South Korea",
//   "Spain",
//   "Thailand",
//   "United Kingdom",
//   "United State",
//   "Vietnam",
// ];

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const url = `/country`;
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

async function CountryPage(props: PageProps) {
  const countryList: Country[] = await getCountryList();

  return (
    <>
      <RootComponent>
        <PageContainer>
          <h2 className="text-3xl mt-4">Country</h2>
          <div className="border-b-[1px] border-solid border-[#363636] w-full my-4" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {countryList.map((country, index) => {
              return (
                <a
                  key={index}
                  href={`/country/${country.name}`}
                  className="text-start p-4 w-full bg-black rounded-md text-xl"
                >
                  {country.name}
                </a>
              );
            })}
          </div>
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default CountryPage;
