import { prisma } from "@/prisma/prisma-client";
import { Episode, PlayerUrl } from "@/types/movie";
import { convertEpisodeDateTimestamp } from "@/utils/client-function/global";
import { getPlayerServerListPanel } from "@/utils/server-function/player-server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  episode: Episode[];
  seasonId: string;
  removedEpisodeId: string[];
};

export async function PATCH(req: NextRequest) {
  const { episode, seasonId, removedEpisodeId }: Body = await req.json();

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
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 403 });
  }
}
