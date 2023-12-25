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
      return res.status(200).json({});
    }
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
