import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { search } = req.query;
    if (search != "" && search?.length ? search?.length > 1 : true) {
      const movie = await prisma.movie.findMany({
        where: {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        orderBy: {
          releasedTimestamp: "desc",
        },
        take: 5,
      });
      return res.status(200).json(movie);
    }
    return res.status(200).json([]);
  } catch (err) {
    res.status(403).json({
      message: err,
    });
  }
}

export default handler;
