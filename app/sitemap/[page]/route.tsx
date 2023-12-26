import { convertSitemapSlug } from "@/utils/client-function/global";
import { generateSitemap } from "@/utils/server-function/sitemap";
import { GetServerSideProps } from "next";
import {
  ISitemapField,
  getServerSideSitemap,
  getServerSideSitemapLegacy,
} from "next-sitemap";
import { NextRequest, NextResponse } from "next/server";

const URLS_PER_SITEMAP = 1000;

const pageList = [
  ``,
  `anime`,
  `country`,
  `drama-korea`,
  `episode`,
  `genre`,
  `jadwal-rilis`,
  `movie`,
  `season`,
  `series`,
];

export async function GET(request: NextRequest) {
  if (!request.nextUrl.pathname) {
    return { notFound: true };
  }
  const fields: ISitemapField[] = [];
  const { type, page } = convertSitemapSlug(request.nextUrl.pathname);
  if (type == "page") {
    pageList.map((url) =>
      fields.push({
        loc: `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
        changefreq: "daily",
        priority: 0.9,
      })
    );
  } else {
    const result = await generateSitemap(+page, URLS_PER_SITEMAP, type);
    result.map((data: { slug: string; updatedAt: Date }) => {
      fields.push({
        loc: `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${data.slug}`,
        lastmod: data.updatedAt.toISOString(),
        changefreq: "daily",
      });
    });
  }
  const cacheMaxAgeUntilStaleSeconds = 60; // 1 minute
  const cacheMaxAgeStaleDataReturnSeconds = 15 * 60; // 15 minutes

  return getServerSideSitemap(fields, {
    "Cache-Control": `public, s-maxage=${cacheMaxAgeUntilStaleSeconds}, stale-while-revalidate=${cacheMaxAgeStaleDataReturnSeconds}`,
  });
}
