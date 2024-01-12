import { prisma } from "@/prisma/prisma-client";
import { Genre, Movie } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  removedGenre: string[];
  genreData: Genre[];
  movieId: string;
};

export async function PATCH(req: NextRequest) {
  const { removedGenre, genreData, movieId }: Body = await req.json();
  try {
    const result = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        genre: {
          disconnect: removedGenre.map((genre) => {
            return {
              name: genre,
            };
          }),
          connectOrCreate: genreData.map((genre) => {
            return {
              where: {
                name: genre.name,
              },
              create: {
                name: genre.name,
              },
            };
          }),
        },
      },
      include: {
        genre: true,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      { status: 403 }
    );
  }
}
