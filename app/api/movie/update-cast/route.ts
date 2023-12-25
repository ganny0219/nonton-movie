import { prisma } from "@/prisma/prisma-client";
import { Actor, Director, Writer } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  removedCast: string[];
  castData: Actor[] | Writer[] | Director[];
  movieId: string;
  type: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { removedCast, castData, movieId, type }: Body = req.body;
  try {
    const result = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        [type]: {
          disconnect: removedCast.map((cast) => {
            return {
              name: cast,
            };
          }),
          connectOrCreate: castData.map((cast) => {
            return {
              where: {
                name: cast.name,
              },
              create: {
                name: cast.name,
                as: cast.as,
                imageUrl: cast.imageUrl,
              },
            };
          }),
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
