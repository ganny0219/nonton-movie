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
    const result = await prisma.googleDrive.create({
      data: {
        googleId: googleDriveData.googleId,
        imdbId: googleDriveData.imdbId,
        movieTitle: googleDriveData.movieTitle,
        season: googleDriveData.season,
        episode: googleDriveData.episode,
        movieType: googleDriveData.movieType,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(403).json(err);
  }
}

export default handler;
