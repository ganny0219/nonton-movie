import { prisma } from "@/prisma/prisma-client";
import { FeaturedData } from "@/types/featured";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await prisma.featured.findMany({
      include: {
        movie: {
          include: {
            season: {
              include: {
                movie: true,
                episode: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    let finalResult: FeaturedData = {
      home: [],
      movie: [],
      series: [],
      anime: [],
      drakor: [],
    };
    for await (let featured of result) {
      finalResult = {
        ...finalResult,
        [featured.type.toLowerCase()]:
          finalResult[featured.type.toLowerCase()]?.length > 0
            ? [...finalResult[featured?.type?.toLowerCase()], featured]
            : [featured],
      };
    }
    res.status(200).json(finalResult);
  } catch (err) {
    console.log(err);
    res.status(403).json({
      message: err,
    });
  }
}

export default handler;
