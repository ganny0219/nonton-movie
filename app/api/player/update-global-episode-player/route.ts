import { prisma } from "@/prisma/prisma-client";
import { Episode, PlayerUrl, Season, Track } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  seasonData: Season;
};

export async function PATCH(req: NextRequest) {
  const { seasonData }: Body = await req.json();
  try {
    for await (let episode of seasonData.episode) {
      for await (let play of episode.playerUrl) {
        if (play.id) {
          await prisma.episodePlayerUrl.update({
            where: {
              id: play.id,
            },
            data: {
              name: play.name,
              url: play.url,
            },
          });
        } else {
          await prisma.episodePlayerUrl.create({
            data: {
              episodeId: episode.id as string,
              name: play.name,
              url: play.url,
            },
          });
        }
      }
    }
    const result = await prisma.season.findUnique({
      where: {
        id: seasonData.id,
      },
      include: {
        episode: {
          include: {
            playerUrl: true,
            track: true,
          },
          orderBy: {
            sequence: "asc",
          },
        },
        movie: true,
      },
    });
    return NextResponse.json(result, { status: 200 });
    // return res.status(201).json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
