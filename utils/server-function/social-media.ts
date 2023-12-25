import { prisma } from "@/prisma/prisma-client";
import { getPrismaJson } from "./global";
import { SocialMedia } from "@/types/social-media";

export const getSocialMedia = async () => {
  try {
    const result = await prisma.socialMedia.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return getPrismaJson(result);
  } catch (err) {
    throw new Error("getSocialMedia Error~");
  }
};
