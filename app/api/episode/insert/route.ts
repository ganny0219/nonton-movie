import { prisma } from "@/prisma/prisma-client";
import { Episode, Season } from "@/types/movie";
import { convertEpisodeDateTimestamp } from "@/utils/client-function/global";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  episode: Episode;
  seasonId: string;
};

export async function POST(req: NextRequest) {
  const { episode, seasonId }: Body = await req.json();

  try {
    const result = await prisma.episode.create({
      data: {
        seasonId: seasonId,
        sequence: +episode.sequence,
        title: episode.title,
        plot: episode.plot,
        rating: episode.rating.toString(),
        totalRating: episode.totalRating,
        slug: episode.slug,
        views: episode.views,
        released: episode.released,
        releasedTimestamp: episode.released
          ? convertEpisodeDateTimestamp(episode.released)
          : "",
        poster: episode.poster,
        vote: {
          set: episode.vote,
        },
      },
      include: {
        playerUrl: true,
        track: true,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
