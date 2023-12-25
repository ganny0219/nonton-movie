import { prisma } from "@/prisma/prisma-client";
import { Episode, PlayerUrl, Season } from "@/types/movie";
import { apiAxios } from "@/utils/axios";
import { convertEpisodeDateTimestamp } from "@/utils/client-function/global";
import { convertReleased } from "@/utils/server-function/imdb";
import { getPlayerServerListPanel } from "@/utils/server-function/player-server";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  episode: Episode[];
  seasonId: string;
  removedEpisodeId: string[];
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { episode, seasonId, removedEpisodeId }: Body = req.body;

  try {
    const playerSet = await getPlayerServerListPanel().then(
      async (playerServerList) => {
        const playerSet: PlayerUrl[] = [];
        for (let playServer of playerServerList) {
          playerSet.push({
            name: playServer.name,
            url: playServer.baseUrl,
          });
        }
        return playerSet;
      }
    );
    await prisma.episode.deleteMany({
      where: {
        id: { in: removedEpisodeId },
      },
    });
    if (episode.length > 0) {
      await prisma.season.update({
        where: {
          id: seasonId as string,
        },
        data: {
          released: episode[episode.length - 1].released,
          releasedTimestamp: episode[episode.length - 1].released
            ? convertEpisodeDateTimestamp(episode[episode.length - 1].released)
            : "",
        },
      });
    }
    for await (let eps of episode) {
      if (eps.id) {
        await prisma.episode.update({
          where: {
            id: eps.id,
          },
          data: {
            seasonId: seasonId,
            sequence: +eps.sequence,
            title: eps.title,
            plot: eps.plot,
            rating: eps.rating.toString(),
            totalRating: eps.totalRating,
            slug: eps.slug,
            views: eps.views,
            released: eps.released,
            releasedTimestamp: eps.released
              ? convertEpisodeDateTimestamp(eps.released)
              : "",
            poster: eps.poster,
            vote: {
              set: eps.vote,
            },
            playerUrl: {
              update: eps.playerUrl.map((player) => {
                return {
                  where: {
                    id: player.id,
                  },
                  data: {
                    name: player.name,
                    url: player.url,
                  },
                };
              }),
            },
          },
        });
      } else {
        await prisma.episode.create({
          data: {
            seasonId: seasonId,
            sequence: +eps.sequence,
            title: eps.title,
            plot: eps.plot,
            rating: eps.rating.toString(),
            totalRating: eps.totalRating,
            slug: eps.slug,
            views: eps.views,
            released: eps.released,
            releasedTimestamp: eps.released
              ? convertEpisodeDateTimestamp(eps.released)
              : "",
            poster: eps.poster,
            vote: {
              set: eps.vote,
            },
            playerUrl: {
              createMany: {
                data: playerSet.map((player) => {
                  return {
                    name: player.name,
                    url: player.url,
                  };
                }),
              },
            },
          },
        });
      }
    }
    const result = await prisma.episode.findMany({
      where: {
        seasonId: seasonId,
      },
      orderBy: {
        sequence: "desc",
      },
      include: {
        track: true,
        playerUrl: true,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
