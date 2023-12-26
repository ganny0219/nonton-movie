import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { PlayerServer } from "@/types/player-server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  playerServer: PlayerServer;
};

export async function POST(req: NextRequest) {
  const { playerServer }: Body = await req.json();
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
    return NextResponse.json({}, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
