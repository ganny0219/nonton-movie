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
    const result = await prisma.playerServer.create({
      data: {
        name: playerServer.name,
        baseUrl: playerServer.baseUrl,
      },
    });
    await apiAxios
      .post(
        `/player/insert-player-server`,
        {
          playerServer: playerServer,
        }
      )
      .then((res) => res.data);
    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
