import { prisma } from "@/prisma/prisma-client";
import { Episode, Season, Track } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import { NextRequest, NextResponse } from "next/server";
type Body = {
  track: Track[];
  episodeId: string;
  removedTrack: Track[];
};

export async function PATCH(req: NextRequest) {
  const { track, episodeId, removedTrack }: Body = await req.json();

  try {
    for await (let removedTrk of removedTrack) {
      await prisma.episodeTrack.delete({
        where: {
          id: removedTrk.id,
        },
      });
      const vttUrl = process.env.NEXT_PUBLIC_BASE_URL + "/vtt/";
      const filePath = `./public/vtt/${removedTrk.url.substring(
        vttUrl.length,
        removedTrk.url.length
      )}`;
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlinkSync(filePath);
        }
      });
    }
    for await (let trk of track) {
      if (trk.id) {
        await prisma.episodeTrack.update({
          where: {
            id: trk.id,
          },
          data: {
            episodeId: episodeId,
            language: trk.language,
            url: trk.url,
          },
        });
      } else {
        await prisma.episodeTrack.create({
          data: {
            episodeId: episodeId,
            language: trk.language,
            url: trk.url,
          },
        });
      }
    }
    const result = await prisma.episodeTrack.findMany({
      where: {
        episodeId: episodeId,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
