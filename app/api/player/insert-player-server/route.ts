import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { PlayerServer } from "@/types/player-server";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  playerServer: PlayerServer;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playerServer }: Body = req.body;
  try {
    const movieList = await prisma.movie.findMany({
      select: {
        id: true,
      },
      where: {
        type: "movie",
      },
    });
    for await (let movie of movieList) {
      const validation = await prisma.playerUrl.findFirst({
        where: {
          movieId: movie.id,
          name: {
            contains: playerServer.name,
            mode: "insensitive",
          },
        },
      });
      if (!validation) {
        await prisma.playerUrl.create({
          data: {
            movieId: movie.id,
            name: playerServer.name,
            url: playerServer.baseUrl,
          },
        });
      }
    }
    const episodeList = await prisma.episode.findMany({
      select: {
        id: true,
      },
    });

    for await (let episode of episodeList) {
      const validation = await prisma.episodePlayerUrl.findFirst({
        where: {
          episodeId: episode.id,
          name: {
            contains: playerServer.name,
            mode: "insensitive",
          },
        },
      });

      if (!validation) {
        await prisma.episodePlayerUrl.create({
          data: {
            episodeId: episode.id,
            name: playerServer.name,
            url: playerServer.baseUrl,
          },
        });
      }
    }
    res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
