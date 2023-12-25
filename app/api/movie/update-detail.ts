import { prisma } from "@/prisma/prisma-client";
import { convertDate } from "@/utils/client-function/global";
import { Movie } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieData } = req.body;
  try {
    const result = await prisma.movie.update({
      where: {
        id: movieData.id,
      },
      data: {
        title: movieData.title,
        slug: movieData.slug,
        year: movieData.year,
        rated: movieData.rated,
        released: movieData.released,
        releasedTimestamp: movieData.released
          ? convertDate(movieData.released)
          : "",
        runtime: movieData.runtime,
        rating: movieData.rating.toString(),
        totalRating: movieData.totalRating,
        imdbId: movieData.imdbId,
        production: movieData.production,
        language: movieData.language,
        country: movieData.country,
        poster: movieData.poster,
        trailerUrl: movieData.trailerUrl,
        resolution: movieData.resolution,
        plot: movieData.plot,
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
