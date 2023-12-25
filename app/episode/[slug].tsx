import React, { useEffect, useState } from "react";
import { DiscussionEmbed } from "disqus-react";
import AdsContainer from "@/components/ads/ads-container-two-grid";
import AdsBannerItem from "@/components/ads/ads-banner-item";
import PageContainer from "@/components/layouts/page-container";
import Line from "@/components/line";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { Episode, EpisodeBySlug, Movie, PlayerUrl } from "@/types/movie";
import axios from "axios";
import { GetServerSideProps } from "next";
import EpisodeItem from "@/components/movie/episode-item";
import Link from "next/link";
import Discussion from "@/components/discussion";
import ChevronLeftIcon from "@/assets/icons/chevron-left-icon";
import ChevronRightIcon from "@/assets/icons/chevron-right-icon";
import BurgerIcon from "@/assets/icons/burger-icon";
import EpisodeNavigation from "@/components/episode/episode-navigation";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";

import AdsContainerOneGrid from "@/components/ads/ads-container-one-grid";
import { data } from "autoprefixer";
import { convertSlugToTitle } from "@/utils/client-function/global";
import { Ads } from "@/types/ads";
import PlayerList from "@/components/button/player-list";
import CustomHead from "@/components/custom-head";
import { apiAxios } from "@/utils/axios";
import { getStringParams } from "@/utils/server-function/global";
import Image from "next/image";
import { getRecomendarionMovie } from "@/utils/server-function/movie";
import { getEpisodeBySlug } from "@/utils/server-function/episode";

type Props = {
  mainEpisode: Episode;
  urlPath: string;
  recomendMovie: Movie[];
  allEpisode: Episode[];
};

function EpisodeMoviePage({
  mainEpisode,
  urlPath,
  recomendMovie,
  allEpisode,
}: Props) {
  const [player, setPlayer] = useState<PlayerUrl | null>(
    mainEpisode.playerUrl[0] ? mainEpisode.playerUrl[0] : null
  );
  const [playerCover, setPlayerCover] = useState(true);
  const vidSrcTrack = `${
    mainEpisode.track.length > 0
      ? `?sub.file=${mainEpisode.track[0].url}&sub.label=${mainEpisode.track[0].language}`
      : ""
  }`;

  useEffect(() => {
    let playUrl = mainEpisode.playerUrl.find(
      (player) => player.url.length > 25
    );
    if (
      playUrl?.name.toLowerCase().includes("playerx") &&
      playUrl?.url[playUrl.url.length] != "/"
    ) {
      playUrl.url = playUrl?.url + "/";
    }
    setPlayer(playUrl ? playUrl : null);
    setPlayerCover(true);
  }, [mainEpisode]);

  const playerHandler = (player: PlayerUrl) => {
    let playerUrl = "";
    if (
      player.name.toLowerCase().includes("playerx") &&
      player.url[player.url.length] != "/"
    ) {
      playerUrl = player.url + "/";
    } else {
      playerUrl = player.url;
    }
    setPlayer({
      ...player,
      url: playerUrl,
    });
  };

  const playerCoverHandler = () => {
    setPlayerCover(false);
  };
  return (
    <>
      <CustomHead
        title={`Nonton ${mainEpisode.season?.movie?.title} : Season ${mainEpisode.season?.sequence} Episode ${mainEpisode.sequence} - Subtitle Indonesia - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${mainEpisode.season?.movie?.title} sub indonesia sub indonesia dengan kualitas tinggi yang tersedia disitus, dalam bahasa indonesia. `}
        keywords={`Nonton ${mainEpisode.season?.movie?.title}, Nonton Film ${mainEpisode.season?.movie?.title}, Nonton ${mainEpisode.season?.movie?.title} Gratis, Nonton ${mainEpisode.season?.movie?.title} Streaming, ${mainEpisode.season?.movie?.title} Subtitle Indonesia`}
      />
      <RootComponent>
        <PageContainer>
          <AdsContainerTwoGrid />
          {player?.url != "" && player?.url != undefined ? (
            // <div className="relative w-full aspect-video overflow-hidden">
            <>
              <iframe
                className="w-full aspect-video"
                src={`${player?.url}${
                  player?.name == "Vidsrc" ? vidSrcTrack : ""
                }`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              {/* {playerCover && (
                <Image loading="lazy"
                alt=""
                height={800}
                width={800}
                src={`/img/screen-cover.png`}
                className="absolute z-96 top-0 left-0 w-full h-full bg-[#313131] hover:cursor-pointer hover:scale-105 active:opacity-70"
                onClick={playerCoverHandler}
                />
              )} */}
            </>
          ) : (
            // </div>
            <div className="w-full aspect-video flex justify-center items-center bg-[#ffffff50] text-2xl">
              Player Error
            </div>
          )}
          <div className="w-full border-t-2 border-dashed border-[#000] my-4" />
          <PlayerList
            playerList={mainEpisode.playerUrl}
            player={player}
            selectedHandler={playerHandler}
          />
          <div className="w-full border-t-2 border-dashed border-[#000] my-4" />
          <AdsContainerOneGrid />
          <EpisodeNavigation
            mainEpisode={mainEpisode}
            allEpisode={allEpisode}
          />
          <h1 className="text-xl mb-4">{`${mainEpisode.season?.movie?.title} : ${mainEpisode.season?.name} - Episode ${mainEpisode.sequence} `}</h1>
          {/* <p className="pb-2">{mainEpisode.plot}</p> */}
          <Line thin />
          {mainEpisode.season?.episode.map((epsd, episodeIndex) => {
            return (
              <div key={episodeIndex} className="relative">
                <EpisodeItem
                  seasonSquence={mainEpisode.season?.sequence}
                  key={episodeIndex}
                  episode={epsd}
                  episodeIndex={episodeIndex}
                />
                {epsd.sequence == mainEpisode.sequence && (
                  <div
                    className={`absolute bg-[#31313190] w-full h-full ${
                      mainEpisode.sequence == 1 ? "top-0" : "top-1"
                    } left-0`}
                  />
                )}
              </div>
            );
          })}

          <Line margin="4" />
          <RecomendationMovie recomendMovie={recomendMovie} />
          <Discussion urlPath={urlPath} />
          <Line margin="4" />
          <Note title={convertSlugToTitle(mainEpisode.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default EpisodeMoviePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const slug = getStringParams(context, "slug");
    const episode: Episode = await getEpisodeBySlug(slug);
    const allEpisode = episode.season?.episode;
    const recomendMovie = await getRecomendarionMovie(
      episode?.season?.movie.genre ? episode?.season?.movie.genre : []
    );
    if (episode) {
      return {
        props: {
          mainEpisode: { ...episode, playerUrl: episode.playerUrl.reverse() },
          recomendMovie,
          urlPath: context.resolvedUrl,

          allEpisode,
        },
      };
    } else {
      return {
        props: {},
        notFound: true,
      };
    }
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
