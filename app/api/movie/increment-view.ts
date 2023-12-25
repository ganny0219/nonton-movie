import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieId } = req.body;
  try {
    const result = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        views: {
          increment: 1,
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
