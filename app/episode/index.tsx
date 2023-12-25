import type { Episode } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { GetServerSideProps, GetStaticProps } from "next";
import EpisodeContainer from "@/components/movie/episode-container";
import CustomHead from "@/components/custom-head";
import { apiAxios } from "@/utils/axios";

import { getEpisodeListPage } from "@/utils/server-function/episode";

type Props = {
  episodeList: Episode[];
  episodeLength: number;
};

function EpisodePage({ episodeList, episodeLength }: Props) {
  return (
    <>
      <CustomHead
        title="Nonton Episode Terbaru dari Serial TV, TV-Series, Seri TV Terbaru Subtitle Indonesia - Nonton Movie"
        description="Nonton Movie - Nonton Serial TV Episode Terbaru, Nonton Drakor Episode Terbaru, Nonton Anime Episode Terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari, semua tersedia disitus."
        keywords="Nonton Film Episode Terbaru, Nonton Gratis Episode Terbaru, Nonton Streaming Episode Terbaru, Nonton Movie Episode Terbaru, Nonton Drama Episode Terbaru, Nonton Anime Episode Terbaru, Subtitle Indonesia, Streaming Drakor Episode Terbaru, Streaming Anime Episode Terbaru"
      />
      <RootComponent>
        <PageContainer title="EPISODE TERBARU">
          <EpisodeContainer episodeList={episodeList} page />
          <Pagination
            movieLength={episodeLength}
            moviePerPage={30}
            url={`/episode/page`}
            offset={1}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default EpisodePage;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { episode, episodeLength } = await getEpisodeListPage(1, "");

    return {
      props: {
        episodeList: episode,
        episodeLength,
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
