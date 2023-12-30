import { prisma } from "@/prisma/prisma-client";
import { PlayerUrl } from "@/types/movie";
import { getPrismaJson } from "./global";

export const getPlayerList = async () => {
  try {
    const result = await prisma.playerServer.findMany({
      orderBy: {
        name: "desc",
      },
    });
    return getPrismaJson(result);
  } catch (err) {
    throw new Error("getPlayerList Error~");
  }
};

export const updatePlayer = async (playerList: PlayerUrl[]) => {
  try {
    for await (let play of playerList) {
      await prisma.playerUrl.update({
        where: {
          id: play.id,
        },
        data: getPrismaJson({
          name: play.name,
          url: play.url,
        }),
      });
    }
  } catch (err) {
    throw new Error("updatePlayer Error~");
  }
};
