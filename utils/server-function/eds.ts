import { prisma } from "@/prisma/prisma-client";
import { Eds } from "@/types/eds";
import { NextApiRequest, NextApiResponse } from "next";
import { getPrismaJson } from "./global";

export const getEdsListPanel = async () => {
  try {
    const result = await prisma.eds.findMany({
      orderBy: {
        sequence: "asc",
      },
    });

    return getPrismaJson(result);
  } catch (err) {
    throw new Error("getEdsListPanel Error~");
  }
};

export const getEdsList = async (type: "half" | "full") => {
  try {
    const result = await prisma.eds.findMany({
      where: {
        type: type,
      },
      orderBy: {
        sequence: "asc",
      },
    });

    return getPrismaJson(result);
  } catch (err) {
    throw new Error("getEdsList Error~");
  }
};
