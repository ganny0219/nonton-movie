import { prisma } from "@/prisma/prisma-client";
import { getPrismaJson } from "./global";

export const getImdbSelector = async (
  type: "movie" | "series" | "episode" | ""
) => {
  try {
    if (type != "") {
      const result = await prisma.imdbSelector.findUnique({
        where: {
          name: type,
        },
      });
      return getPrismaJson(result);
    }
    const result = await prisma.imdbSelector.findMany();
    let finalResult = {
      movie: undefined,
      series: undefined,
      episode: undefined,
    };
    for await (let selector of result) {
      finalResult = {
        ...finalResult,
        [selector.name]: selector,
      };
    }
    return getPrismaJson(finalResult);
  } catch (err) {
    throw new Error("getImdbSelector Error~");
  }
};
