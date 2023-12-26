import CustomHead from "@/components/custom-head";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import Link from "next/link";
import React from "react";

// type Props = {
//   genreList: Genre[];
// };

const countryList = [
  "Australia",
  "Brazil",
  "China",
  "Germany",
  "India",
  "Italy",
  "Japan",
  "New Zealand",
  "Philippines",
  "Russia",
  "South Korea",
  "Spain",
  "Thailand",
  "United Kingdom",
  "United State",
  "Vietnam",
];

function CountryPage() {
  return (
    <>
      {/* <CustomHead
        title="Nonton Film, Movie, Box Office Terbaru dan Terlengkap Subtitle Indonesia - Nonton Movie"
        description="Nonton Movie - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus."
        keywords="Nonton Film, Nonton Gratis, Nonton Streaming, Nonton Movie, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime"
      /> */}
      <RootComponent>
        <PageContainer>
          <h2 className="text-3xl mt-4">Country</h2>
          <div className="border-b-[1px] border-solid border-[#363636] w-full my-4" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {countryList.map((country, index) => {
              return (
                <Link
                  key={index}
                  href={{ pathname: `/country/${country}` }}
                  className="text-start p-4 w-full bg-black rounded-md text-xl"
                >
                  {country}
                </Link>
              );
            })}
          </div>
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default CountryPage;
