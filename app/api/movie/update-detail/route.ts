import { prisma } from "@/prisma/prisma-client";
import { convertDate } from "@/utils/client-function/global";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { movieData } = await req.json();
  try {
    const result = await prisma.movie.update({
      where: {
        id: movieData.id,
      },
      data: {
        title: movieData.title,
        originalTitle: movieData.originalTitle,
        slug: movieData.slug,
        year: movieData.year,
        rated: movieData.rated,
        released: movieData.released,
        releasedTimestamp: movieData.released
          ? convertDate(movieData.released)
          : "",
        runtime: movieData.runtime,
        rating: movieData.rating.toString(),
        totalRating: movieData.totalRating,
        imdbId: movieData.imdbId,
        production: movieData.production,
        language: movieData.language,
        country: {
          connectOrCreate: {
            where: {
              name: movieData.country.name,
            },
            create: {
              name: movieData.country.name,
            },
          },
        },
        poster: movieData.poster,
        trailerUrl: movieData.trailerUrl,
        resolution: movieData.resolution,
        plot: movieData.plot,
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
