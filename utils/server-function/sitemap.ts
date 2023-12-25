import { prisma } from "@/prisma/prisma-client";
import { getPrismaJson } from "./global";

export const countSitemap = async () => {
  try {
    const movie = await prisma.movie.count({
      where: {
        type: "movie",
      },
    });
    const series = await prisma.movie.count({
      where: {
        type: "series",
      },
    });
    const anime = await prisma.movie.count({
      where: {
        type: "anime",
      },
    });
    const drakor = await prisma.movie.count({
      where: {
        type: "drama-korea",
      },
    });
    const season = await prisma.season.count();
    const episode = await prisma.episode.count();
    const genre = await prisma.genre.count();
    const resultCount = {
      movie,
      series,
      anime,
      drakor,
      season,
      episode,
      genre,
    };
    return getPrismaJson(resultCount);
  } catch (error) {
    throw new Error("countSitemap Error~");
  }
};

export const generateSitemap = async (
  page: number,
  pageSize: number,
  type: string
) => {
  try {
    const resultList = [];
    if (type == "movie") {
      const result = await prisma.movie.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
        where: {
          type: "movie",
        },
        orderBy: {
          createdAt: "asc",
        },
        skip: +page * pageSize,
        take: pageSize,
      });
      for (let res of result) {
        resultList.push({ slug: res.slug, updatedAt: res.updatedAt });
      }
    }
    if (type == "series") {
      const result = await prisma.movie.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
        where: {
          type: "series",
        },
        orderBy: {
          createdAt: "asc",
        },
        skip: +page * pageSize,
        take: pageSize,
      });
      for (let res of result) {
        resultList.push({ slug: res.slug, updatedAt: res.updatedAt });
      }
    }
    if (type == "anime") {
      const result = await prisma.movie.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
        where: {
          type: "anime",
        },
        orderBy: {
          createdAt: "asc",
        },
        skip: +page * pageSize,
        take: pageSize,
      });
      for (let res of result) {
        resultList.push({ slug: res.slug, updatedAt: res.updatedAt });
      }
    }
    if (type == "drama-korea") {
      const result = await prisma.movie.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
        where: {
          type: "drama-korea",
        },
        orderBy: {
          createdAt: "asc",
        },
        skip: +page * pageSize,
        take: pageSize,
      });
      for (let res of result) {
        resultList.push({ slug: res.slug, updatedAt: res.updatedAt });
      }
    }
    if (type == "season") {
      const result = await prisma.season.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
        skip: +page * pageSize,
        take: pageSize,
      });
      for (let res of result) {
        resultList.push({ slug: res.slug, updatedAt: res.updatedAt });
      }
    }
    if (type == "episode") {
      const result = await prisma.episode.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
        skip: +page * pageSize,
        take: pageSize,
      });
      for (let res of result) {
        resultList.push({ slug: res.slug, updatedAt: res.updatedAt });
      }
    }
    if (type == "genre") {
      const result = await prisma.genre.findMany({
        select: {
          name: true,
          updatedAt: true,
        },
        orderBy: {
          name: "asc",
        },
        skip: +page * pageSize,
        take: pageSize,
      });
      for (let res of result) {
        resultList.push({ slug: res.name, updatedAt: res.updatedAt });
      }
    }
    return resultList;
  } catch (error) {
    throw new Error("generateSitemap Error~");
  }
};
