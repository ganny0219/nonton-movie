import { prisma } from "@/prisma/prisma-client";
import { Ads } from "@/types/ads";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const adsId = req.nextUrl.searchParams.get("adsId");
    const result = await prisma.ads.delete({
      where: {
        id: adsId as string,
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
