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
  drakor: Movie;
  recomendMovie: Movie[];
};
function StreamDramaKoreaPage({ drakor, recomendMovie }: Props) {
  const [selected, setSelected] = useState<string>("Episodes");
  const selectedHandler = (key: string) => {
    setSelected(key);
  };

  useEffect(() => {
    setSelected("Episodes");
  }, [drakor]);

  const SelectedComponent = () => {
    if (selected === "Episodes") {
      return <Season season={drakor.season} />;
    }
    if (selected === "Info") {
      return (
        <div>
          <h1 className="mb-4">Sypnosis</h1>
          <p>{drakor.plot}</p>
        </div>
      );
    }
    if (selected === "Cast") {
      return (
        <>
          {drakor.director.length != 0 && (
            <CastContainer title="Director">
              {drakor.director.map((director, index) => {
                return <CastCard key={index} cast={director} />;
              })}
            </CastContainer>
          )}
          {drakor.writer.length != 0 && (
            <CastContainer title="Writer">
              {drakor.writer.map((writer, index) => {
                return <CastCard key={index} cast={writer} />;
              })}
            </CastContainer>
          )}
          {drakor.actor.length != 0 && (
            <CastContainer title="Actor">
              {drakor.actor.map((actor, index) => {
                return <CastCard key={index} cast={actor} />;
              })}
            </CastContainer>
          )}
        </>
      );
    }
    if (selected === "Trailer") {
      if (drakor.trailerUrl) {
        return (
          <iframe
            className="w-full aspect-video"
            src={drakor.trailerUrl}
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
        title={`Nonton ${drakor.title} - Subtitle Indonesia - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${drakor.title} sub indonesia sub indonesia dengan kualitas tinggi yang tersedia disitus, dalam bahasa indonesia. `}
        keywords={`Nonton ${drakor.title}, Nonton Film ${drakor.title}, Nonton ${drakor.title} Gratis, Nonton ${drakor.title} Streaming, ${drakor.title} Subtitle Indonesia`}
      />
      <RootComponent>
        <PageContainer>
          <AdsContainerTwoGrid />
          <DetailMovie data={drakor} />
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
          <Note title={convertSlugToTitle(drakor.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default StreamDramaKoreaPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const slug = getStringParams(context, "slug");
    const drakor = await getMovieBySlug(slug);
    const recomendMovie = await getRecomendarionMovie(
      drakor ? drakor.genre : []
    );

    if (drakor) {
      return {
        props: {
          drakor,
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
