import { prisma } from "@/prisma/prisma-client";
import { getPrismaJson } from "./global";

export const getPlayerServerListPanel = async () => {
  try {
    const result = await prisma.playerServer.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return getPrismaJson(result);
  } catch (err) {
    throw new Error("getPlayerServerListPanel Error~");
  }
};

export const getPlayerServerListJson = async () => {
  try {
    const result = await prisma.playerServer.findMany({
      orderBy: {
        name: "asc",
      },
    });
    let finalResult = {};
    for await (let play of result) {
      finalResult = {
        ...finalResult,
        [play.name.toLowerCase()]: play.baseUrl,
      };
    }
    return getPrismaJson(finalResult);
  } catch (err) {
    throw new Error("getPlayerServerListJson Error~");
  }
};
