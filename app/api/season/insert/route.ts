import { prisma } from "@/prisma/prisma-client";
import { Season } from "@/types/movie";
import { convertEpisodeDateTimestamp } from "@/utils/client-function/global";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  seasonData: Season;
  movieId: string;
};

export async function POST(req: NextRequest) {
  const { movieId, seasonData }: Body = await req.json();
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
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
