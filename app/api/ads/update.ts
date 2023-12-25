import { prisma } from "@/prisma/prisma-client";
import { Ads } from "@/types/ads";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  dataAds: Ads;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { dataAds }: Body = req.body;
    const result = await prisma.ads.update({
      where: {
        id: dataAds.id,
      },
      data: {
        name: dataAds.name,
        url: dataAds.url,
        sequence: +dataAds.sequence,
        bannerUrl: dataAds.bannerUrl,
        type: dataAds.type,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({
      message: err,
    });
  }
}

export default handler;
