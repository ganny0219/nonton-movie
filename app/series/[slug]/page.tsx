import React, { useEffect, useState } from "react";
import AdsContainer from "@/components/ads/ads-container-two-grid";
import AdsBannerItem from "@/components/ads/ads-banner-item";
import CastContainer from "@/components/cast/cast-container";
import CastItem from "@/components/cast/cast-card";
import PageContainer from "@/components/layouts/page-container";
import Line from "@/components/line";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { GetServerSideProps } from "next";
import axios from "axios";
import { Movie } from "@/types/movie";
import SelectButton from "@/components/button/select-button";
import Season from "@/components/movie/season";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";

import AdsContainerOneGrid from "@/components/ads/ads-container-one-grid";
import CastCard from "@/components/cast/cast-card";
import { convertSlugToTitle } from "@/utils/client-function/global";
import CustomHead from "@/components/custom-head";
import { apiAxios } from "@/utils/axios";
import { getStringParams } from "@/utils/server-function/global";
import {
  getMovieBySlug,
  getRecomendarionMovie,
} from "@/utils/server-function/movie";

type Props = {
  series: Movie;
  recomendMovie: Movie[];
};
function StreamSeriesPage({ series, recomendMovie }: Props) {
  const [selected, setSelected] = useState<string>("Episodes");
  const selectedHandler = (key: string) => {
    setSelected(key);
  };

  useEffect(() => {
    setSelected("Episodes");
  }, [series]);

  const SelectedComponent = () => {
    if (selected === "Episodes") {
      return <Season season={series.season} />;
    }
    if (selected === "Info") {
      return (
        <div>
          <h1 className="mb-4">Sypnosis</h1>
          <p>{series.plot}</p>
        </div>
      );
    }
    if (selected === "Cast") {
      return (
        <>
          {series.director.length != 0 && (
            <CastContainer title="Director">
              {series.director.map((director, index) => {
                return <CastCard key={index} cast={director} />;
              })}
            </CastContainer>
          )}
          {series.writer.length != 0 && (
            <CastContainer title="Writer">
              {series.writer.map((writer, index) => {
                return <CastCard key={index} cast={writer} />;
              })}
            </CastContainer>
          )}
          {series.actor.length != 0 && (
            <CastContainer title="Actor">
              {series.actor.map((actor, index) => {
                return <CastCard key={index} cast={actor} />;
              })}
            </CastContainer>
          )}
        </>
      );
    }
    if (selected === "Trailer") {
      if (series.trailerUrl) {
        return (
          <iframe
            className="w-full aspect-video"
            src={series.trailerUrl}
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
        title={`Nonton ${series.title} - Subtitle Indonesia - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${series.title} sub indonesia sub indonesia dengan kualitas tinggi yang tersedia disitus, dalam bahasa indonesia. `}
        keywords={`Nonton ${series.title}, Nonton Film ${series.title}, Nonton ${series.title} Gratis, Nonton ${series.title} Streaming, ${series.title} Subtitle Indonesia`}
      />
      <RootComponent>
        <PageContainer>
          <AdsContainerTwoGrid />
          <DetailMovie data={series} />
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
          <Note title={convertSlugToTitle(series.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default StreamSeriesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const slug = getStringParams(context, "slug");
    const series = await getMovieBySlug(slug);
    const recomendMovie = await getRecomendarionMovie(
      series ? series.genre : []
    );

    if (series) {
      return {
        props: {
          series,
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
