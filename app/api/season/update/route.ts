import { prisma } from "@/prisma/prisma-client";
import { Season } from "@/types/movie";
import { convertEpisodeDateTimestamp } from "@/utils/client-function/global";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  seasonData: Season;
  movieId: string;
};

export async function PATCH(req: NextRequest) {
  const { seasonData }: Body = await req.json();
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
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
