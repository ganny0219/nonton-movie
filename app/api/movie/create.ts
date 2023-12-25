import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import {
  convertDate,
  convertEpisodeDateTimestamp,
} from "@/utils/client-function/global";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  movieData: Movie;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieData }: Body = req.body;
  try {
    const duplicate = await prisma.movie.count({
      where: {
        slug: movieData.slug as string,
      },
    });

    if (duplicate > 0) {
      return res.status(422).json({ message: "Duplicate Slug" });
    }

    const result = await prisma.movie.create({
      data: {
        title: movieData.title,
        slug: movieData.slug,
        rating: movieData.rating.toString(),
        totalRating: +movieData.totalRating,
        resolution: movieData.resolution,
        vote: movieData.vote,
        views: movieData.views,
        type: movieData.type,
        country: movieData.country,
        imdbId: movieData.imdbId,
        language: movieData.language,
        plot: movieData.plot,
        poster: movieData.poster,
        production: movieData.production,
        rated: movieData.rated,
        released: movieData.released,
        releasedTimestamp: movieData.released
          ? convertDate(movieData.released)
          : "",
        runtime: movieData.runtime,
        year: movieData.year,
        trailerUrl: movieData.trailerUrl,
        playerUrl: {
          create: movieData.playerUrl.map((player) => {
            return {
              name: player.name,
              url: player.url,
            };
          }),
        },
        track: {
          create: movieData.track.map((track) => {
            return {
              language: track.language,
              url: track.url,
            };
          }),
        },
        genre: {
          connectOrCreate: movieData.genre.map((genre) => {
            return {
              where: {
                name: genre.name,
              },
              create: {
                name: genre.name,
              },
            };
          }),
        },
        actor: {
          connectOrCreate: movieData.actor.map((actor) => {
            return {
              where: {
                name: actor.name,
              },
              create: {
                name: actor.name,
                as: actor.as,
                imageUrl: actor.imageUrl,
              },
            };
          }),
        },
        director: {
          connectOrCreate: movieData.director.map((director) => {
            return {
              where: {
                name: director.name,
              },
              create: {
                name: director.name,
                as: director.as,
                imageUrl: director.imageUrl,
              },
            };
          }),
        },
        writer: {
          connectOrCreate: movieData.writer.map((writer) => {
            return {
              where: {
                name: writer.name,
              },
              create: {
                name: writer.name,
                as: writer.as,
                imageUrl: writer.imageUrl,
              },
            };
          }),
        },
        season:
          movieData.season.length > 0
            ? {
                create: movieData.season.map((season) => {
                  return {
                    name: season.name,
                    rating: season.rating.toString(),
                    totalRating: +season.totalRating,
                    sequence: season.sequence,
                    released: season.released,
                    releasedTimestamp: season.released
                      ? convertEpisodeDateTimestamp(season.released)
                      : "",
                    vote: season.vote,
                    slug: season.slug,
                    poster: season.poster,
                    trailerUrl: season.trailerUrl,
                    episode: {
                      create: season.episode.map((episode) => {
                        return {
                          sequence: episode.sequence,
                          title: episode.title,
                          plot: episode.plot,
                          rating: episode.rating.toString(),
                          totalRating: +episode.totalRating,
                          slug: episode.slug,
                          views: episode.views,
                          released: episode.released,
                          releasedTimestamp: episode.released
                            ? convertEpisodeDateTimestamp(episode.released)
                            : "",
                          poster: episode.poster,
                          vote: episode.vote,
                          track: {
                            create: episode.track?.map((track) => {
                              return {
                                language: track.language,
                                url: track.url,
                              };
                            }),
                          },
                          playerUrl: {
                            create: episode.playerUrl?.map((player) => {
                              return {
                                name: player.name,
                                url: player.url,
                              };
                            }),
                          },
                        };
                      }),
                    },
                  };
                }),
              }
            : undefined,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).send(err);
  }
}

export default handler;
