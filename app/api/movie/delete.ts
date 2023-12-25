import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieId } = req.query;
  try {
    const movie = await prisma.movie.delete({
      where: {
        id: movieId as string,
      },
      include: {
        actor: true,
        director: true,
        genre: true,
        playerUrl: true,
        season: true,
        track: true,
        writer: true,
      },
    });
    res.status(201).json(movie);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
