import React, { useEffect, useState } from "react";
import CastContainer from "@/components/cast/cast-container";
import PageContainer from "@/components/layouts/page-container";
import Line from "@/components/line";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Movie, PlayerUrl } from "@/types/movie";
import SelectButton from "@/components/button/select-button";
import Discussion from "@/components/discussion";
import AdsContainerOneGrid from "@/components/ads/ads-container-one-grid";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";
import CastCard from "@/components/cast/cast-card";
import { convertSlugToTitle } from "@/utils/client-function/global";
import PlayerList from "@/components/button/player-list";
import CustomHead from "@/components/custom-head";

import {
  getMovieBySlug,
  getRecomendarionMovie,
} from "@/utils/server-function/movie";

type Props = {
  movie: Movie;
  urlPath: string;
  recomendMovie: Movie[];
};

function StreamMoviePage({ movie, urlPath, recomendMovie }: Props) {
  const [selected, setSelected] = useState<string>("Info");
  const [player, setPlayer] = useState<PlayerUrl | null>(null);
  const [playerCover, setPlayerCover] = useState(true);
  // const [trackUrl, setTrackUrl] = useState("");
  const vidSrcTrack = `${
    movie.track.length > 0
      ? `?sub.file=${movie.track[0].url}&sub.label=${movie.track[0].language}`
      : ""
  }`;

  useEffect(() => {
    let playUrl = movie.playerUrl.find((player) => player.url.length > 25);
    if (
      playUrl?.name.toLowerCase().includes("playerx") &&
      playUrl?.url[playUrl.url.length] != "/"
    ) {
      playUrl.url = playUrl?.url + "/";
    }
    setPlayer(playUrl ? playUrl : null);
    setPlayerCover(true);
    setSelected("Info");
  }, [movie]);

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

  const selectedHandler = (key: string) => {
    setSelected(key);
  };

  const SelectedComponent = () => {
    if (selected === "Info") {
      return (
        <div>
          <p>{movie.plot}</p>
        </div>
      );
    }

    if (selected === "Cast") {
      return (
        <>
          {movie.director.length != 0 && (
            <CastContainer title="Director">
              {movie.director.map((director, index) => {
                return <CastCard key={index} cast={director} />;
              })}
            </CastContainer>
          )}
          {movie.writer.length != 0 && (
            <CastContainer title="Writer">
              {movie.writer.map((writer, index) => {
                return <CastCard key={index} cast={writer} />;
              })}
            </CastContainer>
          )}
          {movie.actor.length != 0 && (
            <CastContainer title="Actor">
              {movie.actor.map((actor, index) => {
                return <CastCard key={index} cast={actor} />;
              })}
            </CastContainer>
          )}
        </>
      );
    }
    if (selected === "Trailer") {
      if (movie.trailerUrl) {
        return (
          <iframe
            className="w-full aspect-video"
            src={movie.trailerUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        );
      }
    }
  };

  const playerCoverHandler = () => {
    setPlayerCover(false);
  };
  return (
    <>
      <CustomHead
        title={`Nonton ${movie.title} - Subtitle Indonesia - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${movie.title} sub indonesia sub indonesia dengan kualitas tinggi yang tersedia disitus, dalam bahasa indonesia. `}
        keywords={`Nonton ${movie.title}, Nonton Film ${movie.title}, Nonton ${movie.title} Gratis, Nonton ${movie.title} Streaming, ${movie.title} Subtitle Indonesia`}
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
            playerList={movie.playerUrl}
            player={player}
            selectedHandler={playerHandler}
          />
          <div className="w-full border-t-2 border-dashed border-[#000] my-4" />
          <AdsContainerOneGrid />
          <DetailMovie data={movie} />
          <Line margin="4" />
          <div className="flex flex-row font-bold  text-[#313131]">
            <SelectButton
              selected={selected}
              selectedHandler={selectedHandler}
              title="Info"
            />
            <SelectButton
              selected={selected}
              selectedHandler={selectedHandler}
              title="Cast"
            />
            <SelectButton
              selected={selected}
              selectedHandler={selectedHandler}
              title="Trailer"
            />
          </div>
          <Line margin="4" />
          <SelectedComponent />
          <Line margin="4" />
          <RecomendationMovie recomendMovie={recomendMovie} />
          <Discussion urlPath={urlPath} />
          <Line margin="4" />
          <Note title={convertSlugToTitle(movie.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default StreamMoviePage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = context.params?.slug;
    const movie: Movie = await getMovieBySlug(slug);

    if (movie) {
      const recomendMovie = await getRecomendarionMovie(movie.genre);
      return {
        props: {
          movie: { ...movie, playerUrl: movie.playerUrl.reverse() },
          recomendMovie,
          urlPath: "/",
        },
        revalidate: 60,
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
