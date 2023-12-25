import { prisma } from "@/prisma/prisma-client";
import { Ads } from "@/types/ads";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { adsId } = req.query;
    const result = await prisma.ads.delete({
      where: {
        id: adsId as string,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(403).json({
      message: err,
    });
  }
}

export default handler;
