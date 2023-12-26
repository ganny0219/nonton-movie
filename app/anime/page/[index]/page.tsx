import type { MovieResponse } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import CustomHead from "@/components/custom-head";
import { getPageIndexParams } from "@/utils/server-function/global";
import { getMovieListPage } from "@/utils/server-function/movie";
import { PageProps } from "@/types/global";

async function AnimeIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const { movie: anime, movieLength: animeLength }: MovieResponse =
    await getMovieListPage(pageIndex, "anime");

  return (
    <>
      {/* <CustomHead
        title={`Pilihan Genre Anime Terlengkap - Nonton Movie`}
        description={`Nonton Movie - Nonton Film Anime, Serial TV Anime, Drakor Anime, Anime Anime terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film Anime, Nonton Anime Gratis , Nonton Film Anime Streaming, Nonton Movie, Nonton Drama Anime, Nonton Anime Anime, Subtitle Indonesia, Streaming Drakor Anime, Streaming Anime Anime`}
      /> */}
      <RootComponent>
        <PageContainer title="FILM ANIME">
          <MovieContainer title="ANIME TERBARU">
            {anime?.map((anime, index) => {
              return <MovieCard key={index} data={anime} index={index} />;
            })}
          </MovieContainer>
          <Pagination
            movieLength={animeLength}
            moviePerPage={30}
            url={`/anime/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default AnimeIndexPage;
