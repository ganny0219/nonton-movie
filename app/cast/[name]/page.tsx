import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { GetStaticPaths, GetStaticProps, Metadata } from "next";
import { Movie, MovieResponse } from "@/types/movie";
import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import CustomHead from "@/components/custom-head";
import { getMovieByCastPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";
import { generateMetaResult } from "@/utils/server-function/global";

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const castName = decodeURIComponent(params.name);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/cast/${castName}`;
  const title = `Film ${castName} Terbaru - Moovie21`;
  const description = `Moovie21 - Nonton Film ${castName} sub indo dengan kualitas tinggi tersedia dalam subtitle bahasa indonesia.`;
  const keywords = `Nonton Film ${castName}, Nonton Film ${castName} Gratis , Nonton Film ${castName} Streaming, Moovie21, Subtitle Indonesia, ${castName}`;
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
  });
}
export const dynamic = "force-static";
async function CastNamePage(props: PageProps) {
  const castName = decodeURIComponent(props.params.name);
  const { movie, movieLength }: MovieResponse = await getMovieByCastPage(
    1,
    castName
  );
  return (
    <>
      {/* <CustomHead
        title={`Film ${castName} Terbaru - Moovie21`}
        description={`Moovie21 - Nonton Film ${castName} sub indo dengan kualitas tinggi tersedia dalam subtitle bahasa indonesia.`}
        keywords={`Nonton Film ${castName}, Nonton Film ${castName} Gratis , Nonton Film ${castName} Streaming, Moovie21, Subtitle Indonesia, ${castName}`}
      /> */}
      <RootComponent>
        <PageContainer title={castName}>
          <MovieContainer title="Film Terbaru">
            {movie?.map((movie, index) => {
              return <MovieCard key={index} data={movie} index={index} />;
            })}
          </MovieContainer>
          <Pagination
            movieLength={movieLength}
            moviePerPage={30}
            url={`/search/${castName}/page`}
            offset={1}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default CastNamePage;
