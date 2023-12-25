import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

const requestIp = require("request-ip");

type Body = {
  lastVote: string[];
  seasonId: string;
  star: number;
  lastTotalRating: number;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lastVote, seasonId, star, lastTotalRating }: Body = req.body;
    let newRating = "";
    let totalRating = 0;
    if (lastVote.length == 0) {
      newRating = star.toString();
      totalRating = star;
    } else {
      newRating = (
        (+lastTotalRating + star) /
        (lastVote.length + 1)
      ).toString();
      totalRating = lastTotalRating + star;
    }
    let duplicate = false;
    const ip = requestIp.getClientIp(req);
    // lastVote.map((lastIp) => {
    //   if (lastIp == ip) {
    //     duplicate = true;
    //   }
    // });

    if (!duplicate) {
      const result = await prisma.season.update({
        where: {
          id: seasonId,
        },
        data: {
          vote: {
            push: ip,
          },
          rating: {
            set: newRating,
          },
          totalRating: totalRating,
        },
      });
      return res.status(200).json(result);
    }
    res.status(200).json({ message: "not allow vote two times" });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      message: err,
    });
  }
}

export default handler;
