import { prisma } from "@/prisma/prisma-client";
import { MovieType, PlayerUrl } from "@/types/movie";
import { EpisodeCardType } from "@/types/movie";
import { getPrismaJson } from "./global";

export const getEpisodeListPage = async (
  page: number | undefined,
  type: MovieType
) => {
  try {
    const episode: EpisodeCardType[] = await prisma.episode.findMany({
      where: {
        season: {
          movie: {
            type: {
              contains: type,
              mode: "insensitive",
            },
          },
        },
      },
      orderBy: [
        {
          releasedTimestamp: "desc",
        },
        {
          createdAt: "desc",
        },
        {
          sequence: "desc",
        },
      ],

      include: {
        season: {
          include: {
            movie: true,
          },
        },
      },
      skip: ((page ? +page : 1) - 1) * 30,
      take: 30,
    });
    const episodeLength: number = await prisma.episode.count({
      where: {
        season: {
          movie: {
            type: {
              contains: type,
              mode: "insensitive",
            },
          },
        },
      },
    });

    return getPrismaJson({
      episode: episode,
      episodeLength: episodeLength,
    });
  } catch (err) {
    throw new Error("getEpisodeListPage Error~");
  }
};

export const getEpisodeBySlug = async (slug: string) => {
  try {
    const episode = await prisma.episode.findUnique({
      where: {
        slug: slug as string,
      },
      include: {
        playerUrl: {
          orderBy: {
            name: "desc",
          },
        },
        track: true,
        season: {
          include: {
            episode: {
              include: {
                season: {
                  include: {
                    movie: true,
                  },
                },
              },
              orderBy: {
                sequence: "asc",
              },
            },
            movie: {
              include: {
                genre: true,
                country: true,
              },
            },
          },
        },
      },
    });
    if (!episode) {
      return episode;
    }
    const result = getPrismaJson(episode);
    const playerList: PlayerUrl[] = [];
    for (let player of result.playerUrl.filter(
      (player: PlayerUrl) => player.url.length > 25
    )) {
      if (
        player?.name.toLowerCase().includes("playerx") &&
        player?.url[player.url.length] != "/"
      ) {
        playerList.push({
          name: player.name,
          url: player?.url + "/",
        });
      } else {
        playerList.push(player);
      }
    }
    return {
      ...result,
      playerUrl: playerList,
    };
  } catch (err) {
    throw new Error("getEpisodeBySlug Error~");
  }
};
