import { prisma } from "@/prisma/prisma-client";
import { Ads } from "@/types/ads";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  dataAds: Ads;
};

export async function POST(req: NextRequest) {
  try {
    const { dataAds }: Body = await req.json();
    const result = await prisma.ads.create({
      data: {
        name: dataAds.name,
        url: dataAds.url,
        sequence: dataAds.sequence,
        bannerUrl: dataAds.bannerUrl,
        type: dataAds.type,
      },
    });
    return NextResponse.json(result, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json(
      { message: err },
      {
        status: 430,
      }
    );
  }
}
