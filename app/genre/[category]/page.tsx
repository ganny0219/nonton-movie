import type { Movie, MovieResponse } from "@/types/movie";
import type { GetServerSideProps } from "next";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import CustomHead from "@/components/custom-head";
import { apiAxios } from "@/utils/axios";
import { getStringParams } from "@/utils/server-function/global";
import { getMovieListByGenrePage } from "@/utils/server-function/genre";
import { PageProps } from "@/types/global";

type Props = {
  title: string;
  movie: Movie[];
  movieLength: number;
};

async function CategoryPage(props: PageProps) {
  const title = props.params.category;
  const { movie, movieLength }: MovieResponse = await getMovieListByGenrePage(
    title,
    1
  );
  return (
    <>
      {/* <CustomHead
        title={`Pilihan Genre ${title} Terlengkap - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${title}, Serial TV ${title}, Drakor ${title}, Anime ${title} terbaru sub Indonesia dengan kualitas tinggi tersedia dalam bahasa Indonesia.`}
        keywords={`Nonton Film ${title}, Nonton ${title} Gratis , Nonton Film ${title} Streaming, Nonton Movie, Nonton Drama ${title}, Nonton Anime ${title}, Subtitle Indonesia, Streaming Drakor ${title}, Streaming Anime ${title}`}
      /> */}
      <RootComponent>
        <PageContainer title={"FILM " + title}>
          {movie.length > 0 && (
            <MovieContainer title="Film Terbaru">
              {movie?.map((movie, index) => {
                return <MovieCard key={index} data={movie} index={index} />;
              })}
            </MovieContainer>
          )}
          <Pagination
            movieLength={movieLength}
            moviePerPage={30}
            url={`/genre/${title}/page`}
            offset={1}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default CategoryPage;
