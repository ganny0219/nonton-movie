import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { PlayerServer } from "@/types/player-server";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playerServerName } = req.query;
  try {
    await prisma.playerUrl.deleteMany({
      where: {
        name: {
          contains: playerServerName as string,
          mode: "insensitive",
        },
      },
    });

    await prisma.episodePlayerUrl.deleteMany({
      where: {
        name: {
          contains: playerServerName as string,
          mode: "insensitive",
        },
      },
    });
    res.status(201).json({});
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
