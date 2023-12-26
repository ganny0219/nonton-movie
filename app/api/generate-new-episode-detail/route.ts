import {
  createSlug,
  getImdbEpisodeDetail,
  getImdbNewEpisodeDetail,
} from "@/utils/server-function/imdb";
import {
  getTmdbEpisodeDetail,
  getTmdbNewEpisodeDetail,
} from "@/utils/server-function/tmdb";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const imdbId = req.nextUrl.searchParams.get("imdbId");
  const season = req.nextUrl.searchParams.get("season");
  const sequence = req.nextUrl.searchParams.get("sequence");
  const mainTitle = req.nextUrl.searchParams.get("mainTitle");

  try {
    let episode;
    if (imdbId?.includes("tt")) {
      episode = await getImdbNewEpisodeDetail(
        imdbId as string,
        season as string,
        sequence as string,
        mainTitle as string
      );
    } else {
      episode = await getTmdbNewEpisodeDetail(
        imdbId as string,
        season as string,
        sequence as string,
        mainTitle as string
      );
    }

    return NextResponse.json(episode, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 403 });
  }
}
