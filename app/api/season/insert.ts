import { prisma } from "@/prisma/prisma-client";
import { Season } from "@/types/movie";
import { convertEpisodeDateTimestamp } from "@/utils/client-function/global";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  seasonData: Season;
  movieId: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieId, seasonData }: Body = req.body;
  try {
    const result = await prisma.season.create({
      data: {
        movieId: movieId,
        name: seasonData.name,
        slug: seasonData.slug,
        trailerUrl: seasonData.trailerUrl,
        rating: seasonData.rating.toString(),
        totalRating: seasonData.totalRating,
        poster: seasonData.poster,
        released: seasonData.released,
        releasedTimestamp: seasonData.released
          ? convertEpisodeDateTimestamp(seasonData.released)
          : "",
        sequence: seasonData.sequence,
        vote: seasonData.vote,
        episode: undefined,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(403).json(err);
  }
}

export default handler;
