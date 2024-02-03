import { countSitemap } from "@/utils/server-function/sitemap";

import { getServerSideSitemapIndex } from "next-sitemap";
// import { NextResponse } from "next/server";

const URLS_PER_SITEMAP = 1000;

export async function GET() {
  const sitemaps: string[] = [];
  const { movie, series, episode, season, genre, drakor, anime } =
    await countSitemap();
  const amountOfSitemapMovie = Math.ceil(movie / URLS_PER_SITEMAP);
  const amountOfSitemapSeries = Math.ceil(series / URLS_PER_SITEMAP);
  const amountOfSitemapAnime = Math.ceil(anime / URLS_PER_SITEMAP);
  const amountOfSitemapDrakor = Math.ceil(drakor / URLS_PER_SITEMAP);
  const amountOfSitemapSeason = Math.ceil(season / URLS_PER_SITEMAP);
  const amountOfSitemapEpisode = Math.ceil(episode / URLS_PER_SITEMAP);
  const amountOfSitemapGenre = Math.ceil(genre / URLS_PER_SITEMAP);

  sitemaps.push(`${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-page.xml`);

  Array(amountOfSitemapMovie)
    .fill("")
    .map((v, index) =>
      sitemaps.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-movie-${index}.xml`
      )
    );
  Array(amountOfSitemapSeries)
    .fill("")
    .map((v, index) =>
      sitemaps.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-series-${index}.xml`
      )
    );
  Array(amountOfSitemapAnime)
    .fill("")
    .map((v, index) =>
      sitemaps.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-anime-${index}.xml`
      )
    );
  Array(amountOfSitemapDrakor)
    .fill("")
    .map((v, index) =>
      sitemaps.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-drama-korea-${index}.xml`
      )
    );
  Array(amountOfSitemapSeason)
    .fill("")
    .map((v, index) =>
      sitemaps.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-season-${index}.xml`
      )
    );
  Array(amountOfSitemapEpisode)
    .fill("")
    .map((v, index) =>
      sitemaps.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-episode-${index}.xml`
      )
    );
  Array(amountOfSitemapGenre)
    .fill("")
    .map((v, index) =>
      sitemaps.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-genre-${index}.xml`
      )
    );

  const cacheMaxAgeUntilStaleSeconds = 60; // 1 minute
  const cacheMaxAgeStaleDataReturnSeconds = 15 * 60; // 15 minutes

  return getServerSideSitemapIndex(sitemaps, {
    "Content-Type": "application/xml; charset=UTF-8",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    Vary: "Accept-Encoding,User-Agent,Content-Type",
  });
  // return getServerSideSitemapIndex(sitemaps, {
  //   "Cache-Control": `public, s-maxage=${cacheMaxAgeUntilStaleSeconds}, stale-while-revalidate=${cacheMaxAgeStaleDataReturnSeconds}`,
  // });
}
