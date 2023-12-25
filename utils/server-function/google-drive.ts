import { prisma } from "@/prisma/prisma-client";
import { getPrismaJson } from "./global";

export const getGoogleDriveListPanel = async () => {
  try {
    const result = await prisma.googleDrive.findMany();
    return getPrismaJson(result);
  } catch (err) {
    throw new Error("getGoogleDriveListPanel Error~");
  }
};
