import { prisma } from "@/prisma/prisma-client";
import { Episode, Season, Track } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
type Body = {
  track: Track[];
  movieId: string;
  removedTrack: Track[];
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { track, movieId, removedTrack }: Body = req.body;
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
    res.status(201).json(result);
  } catch (err) {
    res.status(403).json(err);
  }
}

export default handler;
