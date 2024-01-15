import React from "react";

import PageContainer from "@/components/layouts/page-container";
import Line from "@/components/line";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { Episode } from "@/types/movie";

import { Metadata } from "next";
import EpisodeItem from "@/components/movie/episode-item";

import Discussion from "@/components/discussion";

import EpisodeNavigation from "@/components/episode/episode-navigation";
import EdsContainerTwoGrid from "@/components/eds/eds-container-two-grid";

import EdsContainerOneGrid from "@/components/eds/eds-container-one-grid";

import { convertSlugToTitle } from "@/utils/client-function/global";

import { generateMetaResult } from "@/utils/server-function/global";
import { getRecomendarionMovie } from "@/utils/server-function/movie";
import { getEpisodeBySlug } from "@/utils/server-function/episode";
import { PageProps } from "@/types/global";
import Player from "@/components/movie/player";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const slug = params.slug;
  const mainEpisode: Episode = await getEpisodeBySlug(slug);
  const url = `/episode/${slug}`;
  const title = `Nonton ${mainEpisode.season?.movie?.title} : Season ${mainEpisode.season?.sequence} Episode ${mainEpisode.sequence} - Subtitle Indonesia - Moovie21`;
  const description = `Moovie21 - Nonton Film ${mainEpisode.season?.movie?.title} : Season ${mainEpisode.season?.sequence} Episode ${mainEpisode.sequence} sub indo dengan kualitas tinggi yang tersedia disitus, dalam subtitle bahasa indonesia. `;
  const keywords = `Nonton ${mainEpisode.season?.movie?.title}, Nonton Film ${mainEpisode.season?.movie?.title}, Nonton ${mainEpisode.season?.movie?.title} Gratis, Nonton ${mainEpisode.season?.movie?.title} Streaming, ${mainEpisode.season?.movie?.title} Subtitle Indonesia`;
  const image = mainEpisode.poster;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
    // searchParams,
  });
}

async function EpisodeMoviePage(props: PageProps) {
  const slug = props.params.slug;
  const mainEpisode: Episode = await getEpisodeBySlug(slug);
  const allEpisode: Episode[] = mainEpisode.season
    ? mainEpisode.season.episode
    : [];
  const recomendMovie = await getRecomendarionMovie(
    mainEpisode?.season?.movie.genre ? mainEpisode?.season?.movie.genre : []
  );

  return (
    <>
      <RootComponent>
        <PageContainer>
          <EdsContainerTwoGrid />
          <Player playerUrl={mainEpisode.playerUrl} track={mainEpisode.track} />
          <EdsContainerOneGrid />
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
                    className={`absolute bg-[#31313190] w-full h-full ${mainEpisode.sequence == 1 ? "top-0" : "top-1"
                      } left-0`}
                  />
                )}
              </div>
            );
          })}

          <Line margin="4" />
          <RecomendationMovie recomendMovie={recomendMovie} />
          <Discussion />
          <Line margin="4" />
          <Note title={convertSlugToTitle(mainEpisode.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default EpisodeMoviePage;
