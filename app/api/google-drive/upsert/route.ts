import { prisma } from "@/prisma/prisma-client";
import { GoogleDrive } from "@/types/google-drive";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  googleDriveData: GoogleDrive;
};

export async function POST(req: NextRequest) {
  const { googleDriveData }: Body = await req.json();

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
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
