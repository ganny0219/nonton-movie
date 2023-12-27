import { prisma } from "@/prisma/prisma-client";
import { Feed } from "feed";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  const feed = new Feed({
    id: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    copyright: "Copyright © 2023 by Nonton Movie. All Rights Reserved.",
    title: "New Movie",
    description: "New Movie List",
    link: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    favicon: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`,
    updated: new Date(),
  });

  const movie = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" },
  });

  movie.forEach((movie) => {
    feed.addItem({
      title: movie.title,
      link: `${process.env.NEXT_PUBLIC_BASE_URL}/${movie.type}/${movie.slug}`,
      description: movie.plot,
      date: new Date(movie.releasedTimestamp),
    });
  });

  return new Response(feed.rss2(), { headers: { "Content-Type": "text/xml" } });
}
