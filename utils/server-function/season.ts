// "use server";
import { prisma } from "@/prisma/prisma-client";
import { MovieType } from "@/types/movie";
import { SeasonBase } from "@/types/movie";
import { getPrismaJson } from "./global";

export const getSeasonListPage = async (
  page: number | undefined,
  type: MovieType
) => {
  try {
    const season: SeasonBase[] = await prisma.season.findMany({
      where: {
        movie: {
          type: {
            contains: type,
            mode: "insensitive",
          },
        },
      },
      orderBy: [
        {
          releasedTimestamp: "desc",
        },
        {
          createdAt: "desc",
        },
        {
          sequence: "desc",
        },
      ],
      skip: ((page ? +page : 1) - 1) * 30,
      take: 30,
      include: {
        movie: true,
      },
    });
    const seasonLength: number = await prisma.season.count({
      where: {
        movie: {
          type: {
            contains: type,
            mode: "insensitive",
          },
        },
      },
    });

    return getPrismaJson({
      season: season,
      seasonLength: seasonLength,
    });
  } catch (err) {
    throw new Error("getSeasonListPage Error~");
  }
};

export const getSeasonBySlug = async (slug: string) => {
  try {
    const season = await prisma.season.findUnique({
      where: {
        slug: slug as string,
      },
      include: {
        movie: {
          include: {
            genre: true,
            country: true,
          },
        },
        episode: {
          include: {
            season: {
              include: {
                movie: true,
              },
            },
          },
          orderBy: {
            sequence: "asc",
          },
        },
      },
    });
    return getPrismaJson(season);
  } catch (err) {
    throw new Error("getSeasonBySlug Error~");
  }
};
