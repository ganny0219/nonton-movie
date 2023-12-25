import type { Movie } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { GetStaticPaths, GetStaticProps } from "next";
import CustomHead from "@/components/custom-head";
import { getPageIndexParams } from "@/utils/server-function/global";
import { getMovieListPage } from "@/utils/server-function/movie";

type Props = {
  drakor: Movie[];
  drakorLength: number;
  pageIndex: number;
};

function DramaKoreaIndexPage({ drakor, drakorLength, pageIndex }: Props) {
  return (
    <>
      <CustomHead
        title={`Pilihan Genre Drama Korea Terlengkap - Nonton Movie`}
        description={`Nonton Movie - Nonton Film Drama Korea, Serial TV Drama Korea, Drakor Drama Korea, Anime Drama Korea terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari, tersedia disitus.`}
        keywords={`Nonton Film Drama Korea, Nonton Drama Korea Gratis , Nonton Film Drama Korea Streaming, Nonton Movie, Nonton Drama Drama Korea, Nonton Anime Drama Korea, Subtitle Indonesia, Streaming Drakor Drama Korea, Streaming Anime Drama Korea`}
      />
      <RootComponent>
        <PageContainer title="FILM DRAMA KOREA">
          <MovieContainer title="DRAMA TERBARU">
            {drakor?.map((drakor, index) => {
              return <MovieCard key={index} data={drakor} index={index} />;
            })}
          </MovieContainer>
          <Pagination
            movieLength={drakorLength}
            moviePerPage={30}
            url={`/drama-korea/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default DramaKoreaIndexPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const pageIndex = getPageIndexParams(context);
    const { movie: drakor, movieLength: drakorLength } = await getMovieListPage(
      pageIndex,
      "drama-korea"
    );

    return {
      props: {
        drakor,
        drakorLength,
        pageIndex,
      },
      revalidate: 60,
    };
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
