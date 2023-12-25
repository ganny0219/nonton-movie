import { prisma } from "@/prisma/prisma-client";
import { Genre, Movie } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  removedGenre: string[];
  genreData: Genre[];
  movieId: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { removedGenre, genreData, movieId }: Body = req.body;
  try {
    const result = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        genre: {
          disconnect: removedGenre.map((genre) => {
            return {
              name: genre,
            };
          }),
          connectOrCreate: genreData.map((genre) => {
            return {
              where: {
                name: genre.name,
              },
              create: {
                name: genre.name,
              },
            };
          }),
        },
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({
      message: err,
    });
  }
}

export default handler;
