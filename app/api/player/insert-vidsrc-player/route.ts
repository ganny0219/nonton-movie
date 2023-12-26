import { prisma } from "@/prisma/prisma-client";
import { Episode, PlayerUrl, Season, Track } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  seasonData: Season;
  imdbId: string;
  season: number;
};

export async function POST(req: NextRequest) {
  const { seasonData, imdbId, season }: Body = await req.json();
  try {
    for (let episode of seasonData.episode) {
      let duplicate = false;
      for (let player of episode.playerUrl) {
        if (
          player.url ==
          `https://vidsrc.to/embed/tv/${imdbId}/${season}/${episode.sequence}`
        ) {
          duplicate = true;
        }
      }
      if (!duplicate) {
        await prisma.episode.update({
          where: {
            id: episode.id,
          },
          data: {
            playerUrl: {
              create: {
                name: "Vidsrc",
                url: `https://vidsrc.to/embed/tv/${imdbId}/${season}/${episode.sequence}`,
              },
            },
          },
          include: {
            playerUrl: true,
            track: true,
          },
        });
      }
    }
    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
