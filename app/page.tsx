import CustomSlider from "@/components/movie/custom-slider";
import PageContainer from "@/components/layouts/page-container";
import FeaturedContainer from "@/components/movie/featured-container";
import RootComponent from "@/components/root-component";
import { Episode, Movie, Season } from "@/types/movie";
import { GetServerSideProps, GetStaticProps } from "next";
import EpisodeContainer from "@/components/movie/episode-container";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";
import CustomHead from "@/components/custom-head";
import { isMobileServerCheck } from "@/utils/server-function/global";
import { getMovieListPage } from "@/utils/server-function/movie";
import { getFeatured } from "@/utils/server-function/featured";
import { getMovieListByGenrePage } from "@/utils/server-function/genre";
import { getSeasonListPage } from "@/utils/server-function/season";
import { getEpisodeListPage } from "@/utils/server-function/episode";

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
      {/* <CustomHead
        title="Nonton Movie - Streaming Film dan TV Series Subtitle Indonesia"
        description="Nonton Movie - Nonton Film, Serial TV, Drakor, Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus."
        keywords="Nonton Film, Nonton Gratis, Nonton Streaming, Nonton Movie, Nonton Drama, Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime"
      /> */}
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
          {actionMovie.length > 0 && (
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
          )}
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
