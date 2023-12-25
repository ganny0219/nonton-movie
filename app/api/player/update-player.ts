import { prisma } from "@/prisma/prisma-client";
import { Episode, PlayerUrl, Season, Track } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  playerList: PlayerUrl[];
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { playerList }: Body = req.body;
  try {
    for await (let play of playerList) {
      await prisma.playerUrl.update({
        where: {
          id: play.id,
        },
        data: {
          name: play.name,
          url: play.url,
        },
      });
    }
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
