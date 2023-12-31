import { prisma } from "@/prisma/prisma-client";
import { GoogleDrive } from "@/types/google-drive";
import { Episode, Season } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  googleDriveData: GoogleDrive;
};
export async function POST(req: NextRequest) {
  const { googleDriveData }: Body = await req.json();
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
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 403 });
  }
}
