import type { EpisodeResponse } from "@/types/movie";
import React from "react";
import PageContainer from "@/components/layouts/page-container";
import Pagination from "@/components/pagination";
import RootComponent from "@/components/root-component";
import { Metadata } from "next";
import EpisodeContainer from "@/components/movie/episode-container";
import { generateMetaResult } from "@/utils/server-function/global";
import { getEpisodeListPage } from "@/utils/server-function/episode";
import { PageProps } from "@/types/global";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const index = params.index;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/episode/page/${index}`;
  const title =
    "Nonton Episode Terbaru dari Serial TV, TV-Series, Seri TV Terbaru Subtitle Indonesia - Moovie21";
  const description =
    "Moovie21 - Nonton Serial TV Episode Terbaru, Nonton Drakor Episode Terbaru, Nonton Anime Episode Terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari, semua tersedia disitus.";
  const keywords =
    "Nonton Film Episode Terbaru, Nonton Gratis Episode Terbaru, Nonton Streaming Episode Terbaru, Moovie21 Episode Terbaru, Nonton Drama Episode Terbaru, Nonton Anime Episode Terbaru, Subtitle Indonesia, Streaming Drakor Episode Terbaru, Streaming Anime Episode Terbaru";
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({ title, description, keywords, url, image });
}
async function EpisodeIndexPage(props: PageProps) {
  const pageIndex = props.params.index;
  const { episode: episodeList, episodeLength }: EpisodeResponse =
    await getEpisodeListPage(pageIndex, "");
  return (
    <>
      <RootComponent>
        <PageContainer title="EPISODE TERBARU">
          <EpisodeContainer episodeList={episodeList} page />
          <Pagination
            movieLength={episodeLength}
            moviePerPage={30}
            url={`/episode/page`}
            offset={pageIndex}
          />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default EpisodeIndexPage;
