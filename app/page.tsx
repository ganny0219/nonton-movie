import CustomSlider from "@/components/movie/custom-slider";
import PageContainer from "@/components/layouts/page-container";
import FeaturedContainer from "@/components/movie/featured-container";
import RootComponent from "@/components/root-component";

import EpisodeContainer from "@/components/movie/episode-container";

import { getMovieListPage } from "@/utils/server-function/movie";
import { getFeatured } from "@/utils/server-function/featured";
import { getMovieListByGenrePage } from "@/utils/server-function/genre";
import { getSeasonListPage } from "@/utils/server-function/season";
import { getEpisodeListPage } from "@/utils/server-function/episode";
import { Metadata, ResolvingMetadata } from "next";
import { PageProps } from "@/types/global";
import { generateMetaResult } from "@/utils/server-function/global";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const title = "Moovie21 - Streaming Film dan TV Series Subtitle Indonesia";
  const description =
    "Moovie21 - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus.";
  const keywords =
    "Nonton Film, Nonton Gratis, Nonton Streaming, Moovie21, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime";
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({ title, description, keywords, url, image });
}

export default async function Home() {
  const movieTerbaru = (await getMovieListPage(1, "movie")).movie;
  const featuredHome = await getFeatured("home");
  const actionMovie = (await getMovieListByGenrePage("action", 1)).movie;
  const animeMovie = (await getMovieListPage(1, "anime")).movie;
  const drakorMovie = (await getMovieListPage(1, "drama-korea")).movie;
  const seasonTerbaru = (await getSeasonListPage(1, "")).season;
  const seriesTerbaru = (await getMovieListPage(1, "series")).movie;
  const episodeTerbaru = (await getEpisodeListPage(1, "")).episode.splice(
    0,
    28
  );

  return (
    <>
      <RootComponent main>
        <PageContainer>
          {/* <AdsContainerTwoGrid /> */}
          {featuredHome.length > 0 && (
            <FeaturedContainer featuredMovie={featuredHome} />
          )}
          {movieTerbaru.length > 0 && (
            <CustomSlider
              title="FILM TERBARU"
              movieList={movieTerbaru}
              urlSeeAll="/movie"
            />
          )}
          {/* {actionMovie.length > 0 && (
            <CustomSlider
              title="FILM ACTION"
              movieList={actionMovie}
              urlSeeAll="/genre/Action"
            />
          )}
          {drakorMovie.length > 0 && (
            <CustomSlider
              movieList={drakorMovie}
              title="DRAMA KOREA"
              urlSeeAll="/drama-korea/page/1"
            />
          )}
          {animeMovie.length > 0 && (
            <CustomSlider
              movieList={animeMovie}
              title="ANIME"
              urlSeeAll="/anime/page/1"
            />
          )}
          {seriesTerbaru.length > 0 && (
            <CustomSlider
              movieList={seriesTerbaru}
              title="SERIAL TV"
              urlSeeAll="/series/page/1"
            />
          )}
          {seasonTerbaru.length > 0 && (
            <CustomSlider
              seasonList={seasonTerbaru}
              title="SEASON TERBARU"
              urlSeeAll="/season"
            />
          )} */}
          {episodeTerbaru.length > 0 && (
            <EpisodeContainer
              episodeList={episodeTerbaru}
              seeAllpath="/episode/page/1"
            />
          )}
        </PageContainer>
      </RootComponent>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const movieTerbaru = await getMovieListPage(1, "movie");
//     const featuredHome = await getFeatured("home");
//     const actionMovie = await getMovieListByGenrePage("action", 1);
//     const animeMovie = await getMovieListPage(1, "anime");
//     const drakorMovie = await getMovieListPage(1, "drama-korea");
//     const seasonTerbaru = await getSeasonListPage(1, "");
//     const seriesTerbaru = await getMovieListPage(1, "series");
//     const episodeTerbaru = await getEpisodeListPage(1, "");

//     return {
//       props: {
//         movieTerbaru: movieTerbaru.movie,
//         featuredHome: featuredHome,
//         actionMovie: actionMovie.movie,
//         animeMovie: animeMovie.movie,
//         drakorMovie: drakorMovie.movie,
//         seasonTerbaru: seasonTerbaru.season,
//         seriesTerbaru: seriesTerbaru.movie,
//         episodeTerbaru: episodeTerbaru.episode.splice(0, 28),
//       },
//       revalidate: 60,
//     };
//   } catch {
//     return {
//       props: {},
//       redirect: {
//         permanent: true,
//         destination: "/error",
//       },
//     };
//   }
// };
