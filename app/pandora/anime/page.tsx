import Line from "@/components/line";
import React, { ReactNode, useState } from "react";
import RootPanel from "@/components/panel/root-panel";
import Link from "next/link";
import { Movie } from "@prisma/client";
import MovieHeaderTable from "@/components/panel/movie/movie-header-table";
import MovieItemTable from "@/components/panel/movie/movie-item-table";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { getMovieListPanel } from "@/utils/server-function/movie";
import MoviePanel from "@/components/panel/movie/movie-panel";

async function MoviePanelPage() {
  const anime = await getMovieListPanel("anime");
  return (
    <>
      <RootPanel selected="anime">
        <MoviePanel movie={anime} title="Anime" type="anime" />
      </RootPanel>
    </>
  );
}

export default MoviePanelPage;
