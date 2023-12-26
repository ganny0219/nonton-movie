import { prisma } from "@/prisma/prisma-client";
import { GoogleDrive } from "@/types/google-drive";
import { Episode, Season } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  googleDriveData: GoogleDrive;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { googleDriveData }: Body = req.body;

  try {
    const result = await prisma.googleDrive.upsert({
      where: {
        googleId: googleDriveData.googleId,
      },
      create: {
        episode: googleDriveData.episode,
        imdbId: googleDriveData.imdbId,
        season: googleDriveData.season,
        movieTitle: googleDriveData.movieTitle,
        googleId: googleDriveData.googleId,
        movieType: googleDriveData.movieType,
      },
      update: {
        episode: googleDriveData.episode,
        imdbId: googleDriveData.imdbId,
        season: googleDriveData.season,
        movieTitle: googleDriveData.movieTitle,
        googleId: googleDriveData.googleId,
        movieType: googleDriveData.movieType,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(403).json(err);
  }
}

export default handler;
