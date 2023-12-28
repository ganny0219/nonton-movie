import { prisma } from "@/prisma/prisma-client";
import { Feed } from "feed";
import { NextResponse } from "next/server";

export async function GET() {
  const feed = new Feed({
    id: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    copyright: "Copyright © 2023 by Moovie21. All Rights Reserved.",
    title: "New Episode",
    description: "New Episode List",
    link: `${process.env.NEXT_PUBLIC_BASE_URL}/episode`,
    favicon: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`,
    updated: new Date(),
  });

  const season = await prisma.season.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      episode: true,
      movie: {
        select: {
          title: true,
          releasedTimestamp: true,
        },
      },
    },
  });

  season.forEach((season) => {
    if (
      season.episode[0] != undefined &&
      season.episode[1] != undefined &&
      season.episode[0].releasedTimestamp == season.episode[1].releasedTimestamp
    ) {
      feed.addItem({
        title: `${season.movie.title} - S${season.sequence} : Episode 1 - ${season.episode.length}`,
        link: `${process.env.NEXT_PUBLIC_BASE_URL}/episode/${season.episode[0].slug}`, // Ganti dengan URL video aktual
        description: `All New Episode ${season.name}`,
        date: new Date(season.episode[0].releasedTimestamp),
      });
    } else {
      season.episode.map((episode) => {
        feed.addItem({
          title: `${season.movie.title} - S${season.sequence} : Episode ${episode.sequence}`,
          link: `${process.env.NEXT_PUBLIC_BASE_URL}/episode/${episode.slug}`, // Ganti dengan URL video aktual
          description: episode.plot,
          date: new Date(episode.releasedTimestamp),
        });
      });
    }
  });
  return new Response(feed.rss2(), { headers: { "Content-Type": "text/xml" } });
}
