import { prisma } from "@/prisma/prisma-client";
import { Season } from "@/types/movie";
import { convertEpisodeDateTimestamp } from "@/utils/client-function/global";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  seasonData: Season;
  movieId: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { seasonData }: Body = req.body;
  try {
    const result = await prisma.season.update({
      where: {
        id: seasonData.id,
      },
      data: {
        sequence: seasonData.sequence,
        name: seasonData.name,
        rating: seasonData.rating.toString(),
        slug: seasonData.slug,
        trailerUrl: seasonData.trailerUrl,
        totalRating: seasonData.totalRating,
        released: seasonData.released,
        releasedTimestamp: seasonData.released
          ? convertEpisodeDateTimestamp(seasonData.released)
          : "",
        poster: seasonData.poster,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(403).json(err);
  }
}

export default handler;
