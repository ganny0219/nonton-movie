import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { PlayerServer } from "@/types/player-server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  playerServer: PlayerServer;
};

export async function PATCH(req: NextRequest) {
  const { playerServer }: Body = await req.json();
  try {
    const prevPlayerServer = await prisma.playerServer.findUnique({
      where: {
        id: playerServer.id,
      },
    });
    if (prevPlayerServer) {
      const playerMovieList = await prisma.playerUrl.findMany();
      for await (let player of playerMovieList) {
        await prisma.playerUrl.update({
          where: {
            id: player.id,
            name: prevPlayerServer.name,
          },
          data: {
            name: playerServer.name,
            url: player.url.replace(
              prevPlayerServer.baseUrl,
              playerServer.baseUrl
            ),
          },
        });
      }
      const playerEpisodeList = await prisma.episodePlayerUrl.findMany();
      for await (let player of playerEpisodeList) {
        await prisma.playerUrl.update({
          where: {
            id: player.id,
            name: prevPlayerServer.name,
          },
          data: {
            name: playerServer.name,
            url: player.url.replace(
              prevPlayerServer.baseUrl,
              playerServer.baseUrl
            ),
          },
        });
      }
      return NextResponse.json({}, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
