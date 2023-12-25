import { prisma } from "@/prisma/prisma-client";
import { Episode, PlayerUrl, Season, Track } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  seasonData: Season;
  imdbId: string;
  season: number;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { seasonData, imdbId, season }: Body = req.body;
  try {
    for (let episode of seasonData.episode) {
      let duplicate = false;
      for (let player of episode.playerUrl) {
        if (
          player.url ==
          `https://vidsrc.to/embed/tv/${imdbId}/${season}/${episode.sequence}`
        ) {
          duplicate = true;
        }
      }
      if (!duplicate) {
        await prisma.episode.update({
          where: {
            id: episode.id,
          },
          data: {
            playerUrl: {
              create: {
                name: "Vidsrc",
                url: `https://vidsrc.to/embed/tv/${imdbId}/${season}/${episode.sequence}`,
              },
            },
          },
          include: {
            playerUrl: true,
            track: true,
          },
        });
      }
    }
    return res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(403).json(err);
  }
}

export default handler;
