import { prisma } from "@/prisma/prisma-client";
import {
  getImdbDetailMovie,
  getImdbDetailSeries,
} from "@/utils/server-function/imdb";
import {
  getTmdbDetailMovie,
  getTmdbDetailSeries,
} from "@/utils/server-function/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const imdbId = req.nextUrl.searchParams.get("imdbId");
  const type = req.nextUrl.searchParams.get("type");
  const create = req.nextUrl.searchParams.get("create");
  try {
    if (create == "true") {
      const duplicate = await prisma.movie.count({
        where: {
          imdbId: imdbId as string,
        },
      });
      if (duplicate > 0) {
        return NextResponse.json(
          { message: "Duplicate Data" },
          { status: 422 }
        );
      }
    }
    let detail = undefined;
    if (type == "movie") {
      if (imdbId?.includes("tt")) {
        detail = await getImdbDetailMovie(imdbId as string);
      } else {
        detail = await getTmdbDetailMovie(imdbId as string);
      }
      return NextResponse.json(
        {
          ...detail,
          imdbId: imdbId,
        },
        { status: 200 }
      );
    } else {
      if (imdbId?.includes("tt")) {
        detail = await getImdbDetailSeries(imdbId as string);
      } else {
        detail = await getTmdbDetailSeries(imdbId as string);
      }
      return NextResponse.json(
        {
          ...detail,
          imdbId: imdbId,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
