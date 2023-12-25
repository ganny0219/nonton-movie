import { prisma } from "@/prisma/prisma-client";
import { Ads } from "@/types/ads";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  dataAds: Ads;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { dataAds }: Body = req.body;
    const result = await prisma.ads.create({
      data: {
        name: dataAds.name,
        url: dataAds.url,
        sequence: dataAds.sequence,
        bannerUrl: dataAds.bannerUrl,
        type: dataAds.type,
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
