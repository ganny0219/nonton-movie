import React from "react";
import RootPanel from "@/components/panel/root-panel";
import { getMovieListPanel } from "@/utils/server-function/movie";
import MoviePanel from "@/components/panel/movie/movie-panel";

//export const dynamic = "force-dynamic";

async function MoviePanelPage() {
  const movie = await getMovieListPanel("movie");
  return (
    <>
      <RootPanel selected="movie">
        <MoviePanel movie={movie} title="Movie" type="movie" />
      </RootPanel>
    </>
  );
}

export default MoviePanelPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       props: {},
//       redirect: {
//         destination: "/pandora/auth",
//       },
//     };
//   }

//   const movie = await getMovieListPanel("movie");

//   return {
//     props: {
//       movie: movie,
//     },
//   };
// };
