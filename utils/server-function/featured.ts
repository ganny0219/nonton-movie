import { prisma } from "@/prisma/prisma-client";
import { FeaturedData, FeaturedType } from "@/types/featured";
import { MovieBase } from "@/types/movie";
import { getPrismaJson } from "./global";

export const getFeatured = async (type: FeaturedType) => {
  try {
    const result = await prisma.featured.findMany({
      where: {
        type: {
          contains: type,
          mode: "insensitive",
        },
      },
      include: {
        movie: {
          include: {
            season: {
              include: {
                movie: true,
                episode: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const finalResult: MovieBase[] = [];
    for (let featured of result) {
      finalResult.push(featured.movie);
    }
    return getPrismaJson(finalResult);
  } catch (err) {
    throw new Error("getFeaturedHome Error~");
  }
};

export const getFeaturedListPanel = async () => {
  try {
    const result = await prisma.featured.findMany({
      include: {
        movie: {
          include: {
            season: {
              include: {
                movie: true,
                episode: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    let finalResult: FeaturedData = {
      home: [],
      movie: [],
      series: [],
      anime: [],
      drakor: [],
    };
    for await (let featured of result) {
      finalResult = {
        ...finalResult,
        [featured.type.toLowerCase()]:
          finalResult[featured.type.toLowerCase()]?.length > 0
            ? [...finalResult[featured?.type?.toLowerCase()], featured]
            : [featured],
      };
    }
    return getPrismaJson(finalResult);
  } catch (err) {
    throw new Error("getFeaturedListPanel Error~");
  }
};
