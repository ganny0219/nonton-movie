import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { PlayerServer } from "@/types/player-server";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  playerServer: PlayerServer;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playerServer }: Body = req.body;
  try {
    await apiAxios
      .post(
        `/player/update-player-server`,
        {
          playerServer: playerServer,
        }
      )
      .then((res) => res.data);
    const result = await prisma.playerServer.update({
      where: {
        id: playerServer.id,
      },
      data: {
        name: playerServer.name,
        baseUrl: playerServer.baseUrl,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
