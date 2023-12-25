import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { episodeId } = req.body;
  try {
    const result = await prisma.episode.update({
      where: {
        id: episodeId,
      },
      data: {
        views: {
          increment: 1,
        },
        season: {
          update: {
            movie: {
              update: {
                views: {
                  increment: 1,
                },
              },
            },
          },
        },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({
      message: err,
    });
  }
}

export default handler;
