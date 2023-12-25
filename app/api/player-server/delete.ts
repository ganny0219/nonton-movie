import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playerServerId, playerServerName } = req.query;
  try {
    const result = await prisma.playerServer.delete({
      where: {
        id: playerServerId as string,
      },
    });
    await apiAxios
      .delete(
        `/player/delete-player-server`,
        {
          params: {
            playerServerName: playerServerName,
          },
        }
      )
      .then((res) => res.data);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
