import { prisma } from "@/prisma/prisma-client";
import { Ads } from "@/types/ads";
import { NextApiRequest, NextApiResponse } from "next";
import { getPrismaJson } from "./global";

export const getAdsListPanel = async () => {
  try {
    const result = await prisma.ads.findMany({
      orderBy: {
        sequence: "asc",
      },
    });

    return getPrismaJson(result);
  } catch (err) {
    throw new Error("getAdsListPanel Error~");
  }
};

export const getAdsList = async (type: "half" | "full") => {
  try {
    const result = await prisma.ads.findMany({
      where: {
        type: type,
      },
      orderBy: {
        sequence: "asc",
      },
    });

    return getPrismaJson(result);
  } catch (err) {
    throw new Error("getAdsList Error~");
  }
};
