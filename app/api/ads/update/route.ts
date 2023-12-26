import { prisma } from "@/prisma/prisma-client";
import { Ads } from "@/types/ads";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  dataAds: Ads;
};

export async function PATCH(req: NextRequest) {
  try {
    const { dataAds }: Body = await req.json();
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
    return NextResponse.json(result, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      {
        status: 403,
      }
    );
  }
}
