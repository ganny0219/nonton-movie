import { prisma } from "@/prisma/prisma-client";
import { ImdbSelector } from "@/types/imdbSelector";
import { Movie } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  selectorData: ImdbSelector;
};
export async function PATCH(req: NextRequest) {
  const { selectorData }: Body = await req.json();
  try {
    const result = await prisma.imdbSelector.upsert({
      where: {
        name: selectorData.name,
      },
      create: {
        name: selectorData.name,
        country: selectorData.country ? selectorData.country : "",
        genre: selectorData.genre ? selectorData.genre : "",
        language: selectorData.language ? selectorData.language : "",
        plot: selectorData.plot ? selectorData.plot : "",
        poster: selectorData.poster ? selectorData.poster : "",
        rated: selectorData.rated ? selectorData.rated : "",
        runtime: selectorData.runtime ? selectorData.runtime : "",
        released: selectorData.released ? selectorData.released : "",
        mainTitle: selectorData.mainTitle ? selectorData.mainTitle : "",
        episodeTitle: selectorData.episodeTitle
          ? selectorData.episodeTitle
          : "",
        actorArray: selectorData.actorArray ? selectorData.actorArray : "",
        actorAs: selectorData.actorAs ? selectorData.actorAs : "",
        actorImage: selectorData.actorImage ? selectorData.actorImage : "",
        actorName: selectorData.actorName ? selectorData.actorName : "",
        director: selectorData.director ? selectorData.director : "",
        episodeArray: selectorData.episodeArray
          ? selectorData.episodeArray
          : "",
        writer: selectorData.writer ? selectorData.writer : "",
        year: selectorData.year ? selectorData.year : "",
      },
      update: {
        name: selectorData.name,
        country: selectorData.country,
        genre: selectorData.genre,
        language: selectorData.language,
        plot: selectorData.plot,
        poster: selectorData.poster,
        rated: selectorData.rated,
        runtime: selectorData.runtime,
        released: selectorData.released,
        mainTitle: selectorData.mainTitle,
        episodeTitle: selectorData.episodeTitle,
        actorArray: selectorData.actorArray,
        actorAs: selectorData.actorAs,
        actorImage: selectorData.actorImage,
        actorName: selectorData.actorName,
        director: selectorData.director,
        episodeArray: selectorData.episodeArray,
        writer: selectorData.writer,
        year: selectorData.year,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 403 });
  }
}
