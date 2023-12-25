// "use server";
import { prisma } from "@/prisma/prisma-client";
import { Movie, MovieBase } from "@/types/movie";
import { getPrismaJson } from "./global";

export const getMovieListByGenrePage = async (
  genre: string,
  page: number | undefined
) => {
  try {
    const movie: MovieBase[] = await prisma.movie.findMany({
      where: {
        genre: {
          some: {
            name: {
              contains: genre as string,
              mode: "insensitive",
            },
          },
        },
      },
      orderBy: {
        releasedTimestamp: "desc",
      },
      skip: ((page ? +page : 1) - 1) * 30,
      take: 30,
    });

    const movieLength: number = await prisma.movie.count({
      where: {
        genre: {
          some: {
            name: {
              contains: genre as string,
              mode: "insensitive",
            },
          },
        },
      },
    });

    return getPrismaJson({
      movie: movie,
      movieLength: movieLength,
    });
  } catch (err) {
    throw new Error("getMovieListByGenrePage Error~");
  }
};

export const getGenreList = async () => {
  try {
    const result = await prisma.genre.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return getPrismaJson(result);
  } catch (err) {
    throw new Error("getGenreList Error~");
  }
};
