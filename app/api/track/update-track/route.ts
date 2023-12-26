import { prisma } from "@/prisma/prisma-client";
import { Episode, Season, Track } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import { NextRequest, NextResponse } from "next/server";
type Body = {
  track: Track[];
  movieId: string;
  removedTrack: Track[];
};

export async function PATCH(req: NextRequest) {
  const { track, movieId, removedTrack }: Body = await req.json();
  try {
    for await (let removedTrk of removedTrack) {
      await prisma.track.delete({
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
        await prisma.track.update({
          where: {
            id: trk.id,
          },
          data: {
            movieId: movieId,
            language: trk.language,
            url: trk.url,
          },
        });
      } else {
        await prisma.track.create({
          data: {
            movieId: movieId,
            language: trk.language,
            url: trk.url,
          },
        });
      }
    }
    const result = await prisma.track.findMany({
      where: {
        movieId: movieId,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
