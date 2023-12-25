import React, { useEffect, useState } from "react";
import CastContainer from "@/components/cast/cast-container";
import PageContainer from "@/components/layouts/page-container";
import Line from "@/components/line";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { GetServerSideProps } from "next";
import { Movie } from "@/types/movie";
import SelectButton from "@/components/button/select-button";
import Season from "@/components/movie/season";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";

import CastCard from "@/components/cast/cast-card";
import { convertSlugToTitle } from "@/utils/client-function/global";
import CustomHead from "@/components/custom-head";
import { getStringParams } from "@/utils/server-function/global";
import {
  getMovieBySlug,
  getRecomendarionMovie,
} from "@/utils/server-function/movie";

type Props = {
  anime: Movie;
  recomendMovie: Movie[];
};
function StreamAnimePage({ anime, recomendMovie }: Props) {
  const [selected, setSelected] = useState<string>("Episodes");
  const selectedHandler = (key: string) => {
    setSelected(key);
  };

  useEffect(() => {
    setSelected("Episodes");
  }, [anime]);

  const SelectedComponent = () => {
    if (selected === "Episodes") {
      return <Season season={anime.season} />;
    }
    if (selected === "Info") {
      return (
        <div>
          <h1 className="mb-4">Sypnosis</h1>
          <p>{anime.plot}</p>
        </div>
      );
    }
    if (selected === "Cast") {
      return (
        <>
          {anime.director.length != 0 && (
            <CastContainer title="Director">
              {anime.director.map((director, index) => {
                return <CastCard key={index} cast={director} />;
              })}
            </CastContainer>
          )}
          {anime.writer.length != 0 && (
            <CastContainer title="Writer">
              {anime.writer.map((writer, index) => {
                return <CastCard key={index} cast={writer} />;
              })}
            </CastContainer>
          )}
          {anime.actor.length != 0 && (
            <CastContainer title="Actor">
              {anime.actor.map((actor, index) => {
                return <CastCard key={index} cast={actor} />;
              })}
            </CastContainer>
          )}
        </>
      );
    }
    if (selected === "Trailer") {
      if (anime.trailerUrl) {
        return (
          <iframe
            className="w-full aspect-video"
            src={anime.trailerUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        );
      }
    }
  };

  return (
    <>
      <CustomHead
        title={`Nonton ${anime.title} - Subtitle Indonesia - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${anime.title} sub indonesia sub indonesia dengan kualitas tinggi yang tersedia disitus, dalam bahasa indonesia. `}
        keywords={`Nonton ${anime.title}, Nonton Film ${anime.title}, Nonton ${anime.title} Gratis, Nonton ${anime.title} Streaming, ${anime.title} Subtitle Indonesia`}
      />
      <RootComponent>
        <PageContainer>
          <AdsContainerTwoGrid />
          <DetailMovie data={anime} />
          <Line margin="4" />
          <div className="flex-wrap flex-row font-bold text-[#313131]">
            <SelectButton
              selected={selected}
              selectedHandler={selectedHandler}
              title="Episodes"
            />
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
          <Note title={convertSlugToTitle(anime.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default StreamAnimePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const slug = getStringParams(context, "slug");
    const anime = await getMovieBySlug(slug);
    const recomendMovie = await getRecomendarionMovie(anime ? anime.genre : []);

    context.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=60"
    );
    if (anime) {
      return {
        props: {
          anime,
          recomendMovie,
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
