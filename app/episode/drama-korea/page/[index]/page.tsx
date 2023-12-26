import type { Episode, EpisodeResponse, Movie } from "@/types/movie";
import React, { useState } from "react";

import PageContainer from "@/components/layouts/page-container";
import MovieCard from "@/components/movie/movie-card";
import MovieContainer from "@/components/movie/movie-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import FeaturedContainer from "@/components/movie/featured-container";
import EpisodeContainer from "@/components/movie/episode-container";
import CustomHead from "@/components/custom-head";
import { apiAxios } from "@/utils/axios";
import { getPageIndexParams } from "@/utils/server-function/global";
import { getEpisodeListPage } from "@/utils/server-function/episode";
import { PageProps } from "@/types/global";

async function EpisodeIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const { episode: episodeList, episodeLength }: EpisodeResponse =
    await getEpisodeListPage(pageIndex, "drama-korea");
  return (
    <>
      {/* <CustomHead
        title="Nonton Episode Terbaru dari Serial TV, TV-Series, Seri TV Terbaru Subtitle Indonesia - Nonton Movie"
        description="Nonton Movie - Nonton Serial TV Episode Terbaru, Nonton Drakor Episode Terbaru, Nonton Anime Episode Terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari, semua tersedia disitus."
        keywords="Nonton Film Episode Terbaru, Nonton Gratis Episode Terbaru, Nonton Streaming Episode Terbaru, Nonton Movie Episode Terbaru, Nonton Drama Episode Terbaru, Nonton Anime Episode Terbaru, Subtitle Indonesia, Streaming Drakor Episode Terbaru, Streaming Anime Episode Terbaru"
      /> */}
      <RootComponent>
        <PageContainer title="EPISODE TERBARU">
          <EpisodeContainer episodeList={episodeList} page />
          <Pagination
            movieLength={episodeLength}
            moviePerPage={30}
            url={`/episode/drama-korea/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default EpisodeIndexPage;
