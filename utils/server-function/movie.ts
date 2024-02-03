// "use server";
import { prisma } from "@/prisma/prisma-client";
import { MovieById, MovieType, PlayerUrl } from "@/types/movie";
import { Genre, MovieBase } from "@/types/movie";
import { getPrismaJson } from "./global";

export const getMovieListPage = async (
  page: number | undefined,
  type: MovieType
) => {
  try {
    const movie: MovieBase[] = await prisma.movie.findMany({
      where: {
        type: type,
      },
      orderBy: [
        {
          releasedTimestamp: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      skip: ((page ? +page : 1) - 1) * 30,
      take: 30,
    });
    const movieLength: number = await prisma.movie.count({
      where: {
        type: type,
      },
    });
    return getPrismaJson({
      movie: movie,
      movieLength: movieLength,
    });
  } catch (err) {
    throw new Error("getMoviePage Error~");
  }
};

export const getMovieBySlug = async (
  slug: string | string[] | undefined,
  type: MovieType
) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        type,
        slug: slug as string,
      },
      include: {
        actor: true,
        director: true,
        track: true,
        writer: true,
        featured: true,
        season: {
          include: {
            episode: {
              include: {
                season: {
                  include: {
                    movie: true,
                  },
                },
                playerUrl: {
                  orderBy: {
                    name: "desc",
                  },
                },
                track: true,
              },
              orderBy: {
                sequence: "asc",
              },
            },
          },
          orderBy: {
            sequence: "desc",
          },
        },
        genre: true,
        country: true,
        playerUrl: {
          orderBy: {
            name: "desc",
          },
        },
      },
    });
    if (!movie) {
      return movie;
    }
    const result = getPrismaJson(movie);
    const playerList: PlayerUrl[] = [];
    for (let player of result.playerUrl.filter(
      (player: PlayerUrl) => player.url.length > 25
    )) {
      if (
        player?.name.toLowerCase().includes("playerx") &&
        player?.url[player.url.length] != "/"
      ) {
        playerList.push({
          name: player.name,
          url: player?.url + "/",
        });
      } else {
        playerList.push(player);
      }
    }
    return {
      ...result,
      playerUrl: playerList,
    };
  } catch (err) {
    console.log(err);
    throw new Error("getMovieBySlug Error~");
  }
};

export const getRecomendarionMovie = async (genres: Genre[]) => {
  try {
    const genreList = Array.from(genres, (genre) => genre.name);
    const movieList = await prisma.movie.findMany({
      where: {
        genre: {
          some: {
            name: {
              in: genreList,
              mode: "insensitive",
            },
          },
        },
      },
      orderBy: {
        releasedTimestamp: "desc",
      },
    });
    if (movieList.length <= 15) {
      return getPrismaJson(movieList);
    }
    const filmTerpilih = [];
    const idTemp: string[] = [];

    let i = 0;
    while (i <= 15) {
      const nomorAcak = Math.floor(Math.random() * movieList.length);
      if (idTemp.length < 1) {
        idTemp.push(movieList[nomorAcak].id);
        i++;
      }
      if (!idTemp.includes(movieList[nomorAcak].id)) {
        idTemp.push(movieList[nomorAcak].id);
        filmTerpilih.push(movieList[nomorAcak]);
        i++;
      }
    }

    return getPrismaJson(filmTerpilih);
  } catch (err) {
    throw new Error("getRecomendationMovie Error~");
  }
};

export const getMovieListByCountryPage = async (
  page: number | undefined,
  country: string
) => {
  try {
    const movie = await prisma.movie.findMany({
      where: {
        country: {
          name: {
            contains: country as string,
            mode: "insensitive",
          },
        },
      },
      orderBy: {
        releasedTimestamp: "desc",
      },
      skip: ((page ? +page : 1) - 1) * 30,
      take: 30,
    });

    const movieLength = await prisma.movie.count({
      where: {
        country: {
          name: {
            contains: country as string,
            mode: "insensitive",
          },
        },
      },
    });

    return getPrismaJson({
      movie: movie,
      movieLength: movieLength,
    });
  } catch (err) {
    throw new Error("getMovieListByCountryPage Error~");
  }
};

export const getMovieByCastPage = async (
  page: number | undefined,
  castName: string
) => {
  try {
    const movie = await prisma.movie.findMany({
      orderBy: {
        releasedTimestamp: "desc",
      },
      skip: ((page ? +page : 1) - 1) * 30,
      take: 30,
      where: {
        OR: [
          {
            actor: {
              some: {
                name: {
                  contains: castName as string,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            director: {
              some: {
                name: {
                  contains: castName as string,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            writer: {
              some: {
                name: {
                  contains: castName as string,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
    });
    const movieLength = await prisma.movie.count({
      where: {
        OR: [
          {
            actor: {
              some: {
                name: {
                  contains: castName as string,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            director: {
              some: {
                name: {
                  contains: castName as string,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            writer: {
              some: {
                name: {
                  contains: castName as string,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
    });

    return getPrismaJson({
      movie: movie,
      movieLength: movieLength,
    });
  } catch (err) {
    throw new Error("getMovieByCastPage Error~");
  }
};

export const getMovieByOfficalPage = async (
  page: number | undefined,
  production: string
) => {
  try {
    const movie = await prisma.movie.findMany({
      where: {
        production: {
          equals: production as string,
          mode: "insensitive",
        },
      },
      orderBy: {
        releasedTimestamp: "desc",
      },
      skip: ((page ? +page : 1) - 1) * 30,
      take: 30,
    });
    const movieLength = await prisma.movie.count({
      where: {
        production: {
          contains: production as string,
          mode: "insensitive",
        },
      },
    });
    return getPrismaJson({
      movie: movie,
      movieLength: movieLength,
    });
  } catch (err) {
    throw new Error("getMovieByOfficalPage Error~");
  }
};

export const getMovieBySearchPage = async (
  page: number | undefined,
  search: string
) => {
  try {
    const movie = await prisma.movie.findMany({
      where: {
        title: {
          contains: search as string,
          mode: "insensitive",
        },
      },
      orderBy: {
        releasedTimestamp: "desc",
      },
      skip: ((page ? +page : 1) - 1) * 30,
      take: 30,
    });
    const movieLength = await prisma.movie.count({
      where: {
        title: {
          contains: search as string,
          mode: "insensitive",
        },
      },
    });
    return getPrismaJson({
      movie: movie,
      movieLength: movieLength,
    });
  } catch (err) {
    throw new Error("getMovieBySearchPage Error~");
  }
};

export const getMovieListPanel = async (type: MovieType) => {
  try {
    const result = await prisma.movie.findMany({
      // select: {
      //   id: true,
      //   title: true,
      //   imdbId: true,
      //   resolution: true,
      // },
      where: {
        type: {
          contains: type,
          mode: "insensitive",
        },
      },
      orderBy: {
        title: "asc",
      },
    });

    return getPrismaJson(result);
  } catch (err) {
    throw new Error("getMovieListPanel Error~");
  }
};

export const getMovieById = async (movieId: string) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId as string,
      },
      include: {
        genre: true,
        country: true,
        director: true,
        writer: true,
        actor: true,
        track: true,
        playerUrl: {
          orderBy: {
            name: "asc",
          },
        },
        season: {
          orderBy: {
            sequence: "asc",
          },
          include: {
            episode: {
              orderBy: {
                sequence: "desc",
              },
              include: {
                track: true,
                playerUrl: {
                  orderBy: {
                    name: "desc",
                  },
                },
              },
            },
          },
        },
      },
    });
    return getPrismaJson(movie);
  } catch (err) {
    throw new Error("getMovieById Error~");
  }
};
