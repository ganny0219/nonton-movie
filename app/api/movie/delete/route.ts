import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const movieId = req.nextUrl.searchParams.get("movieId");
  try {
    const movie = await prisma.movie.delete({
      where: {
        id: movieId as string,
      },
      include: {
        actor: true,
        director: true,
        genre: true,
        playerUrl: true,
        season: true,
        track: true,
        writer: true,
      },
    });
    return NextResponse.json(movie, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
