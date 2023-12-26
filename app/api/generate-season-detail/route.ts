import { createSlug, getImdbEpisodeDetail } from "@/utils/server-function/imdb";
import { getTmdbEpisodeDetail } from "@/utils/server-function/tmdb";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const imdbId = req.nextUrl.searchParams.get("imdbId");
  const season = req.nextUrl.searchParams.get("season");
  const untilEps = req.nextUrl.searchParams.get("untilEps");
  const mainTitle = req.nextUrl.searchParams.get("mainTitle");
  try {
    let episodes;
    if (imdbId?.includes("tt")) {
      episodes = await getImdbEpisodeDetail(
        imdbId as string,
        season as string,
        mainTitle as string
      );
    } else {
      episodes = await getTmdbEpisodeDetail(
        imdbId as string,
        season as string,
        mainTitle as string
      );
    }

    if (untilEps == "0") {
      return NextResponse.json({ episode: episodes }, { status: 200 });
    }

    const resultEpsiode = [];
    let count = 0;
    for await (let eps of episodes) {
      //@ts-ignore
      if (count < +untilEps) {
        resultEpsiode.push(eps);
      }
      count = count + 1;
    }

    return NextResponse.json({ episode: resultEpsiode }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 403 });
  }
}
