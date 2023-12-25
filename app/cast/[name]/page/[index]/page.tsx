import React from "react";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { GetStaticPaths, GetStaticProps } from "next";
import { Movie } from "@/types/movie";

import MovieContainer from "@/components/movie/movie-container";
import MovieCard from "@/components/movie/movie-card";
import Pagination from "@/components/pagination";
import CustomHead from "@/components/custom-head";
import { getPageIndexParams } from "@/utils/server-function/global";
import { getMovieByCastPage } from "@/utils/server-function/movie";

type Props = {
  movie: Movie[];
  movieLength: number;
  pageIndex: number;
  castName: string;
};
function CastNameIndexPage({ movie, castName, movieLength, pageIndex }: Props) {
  return (
    <>
      <CustomHead
        title={`Film ${castName} Terbaru - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${castName} dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari, semua tersedia disitus.`}
        keywords={`Nonton Film ${castName}, Nonton Film ${castName} Gratis , Nonton Film ${castName} Streaming, Nonton Movie, Subtitle Indonesia, ${castName}`}
      />
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
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default CastNameIndexPage;
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const pageIndex = getPageIndexParams(context);
    const castName = context.params?.name as string;
    const { movie, movieLength } = await getMovieByCastPage(
      pageIndex,
      castName
    );

    if (movie) {
      return {
        props: {
          movie,
          movieLength,
          castName: castName,
          pageIndex,
        },
        revalidate: 60,
      };
    } else {
      return {
        props: {},
        notFound: true,
      };
    }
  } catch {
    return {
      props: {},
      redirect: {
        permanent: true,
        destination: "/error",
      },
    };
  }
};
