import { prisma } from "@/prisma/prisma-client";
import { Feed } from "feed";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  const feed = new Feed({
    id: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    copyright: "Copyright © 2023 by Moovie21. All Rights Reserved.",
    title: "New Season",
    description: "New Season List",
    link: `${process.env.NEXT_PUBLIC_BASE_URL}/season`,
    favicon: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`,
    updated: new Date(),
  });

  const season = await prisma.season.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      movie: {
        select: {
          title: true,
          plot: true,
        },
      },
    },
  });

  season.forEach((season) => {
    feed.addItem({
      title: `${season.movie.title} - ${season.name}`,
      link: `${process.env.NEXT_PUBLIC_BASE_URL}/season/${season.slug}`,
      description: season.movie.plot,
      date: new Date(season.releasedTimestamp),
    });
  });

  return new Response(feed.rss2(), { headers: { "Content-Type": "text/xml" } });
}
