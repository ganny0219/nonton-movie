import { prisma } from "@/prisma/prisma-client";
import { Eds } from "@/types/eds";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  dataEds: Eds;
};

export async function POST(req: NextRequest) {
  try {
    const { dataEds }: Body = await req.json();
    const result = await prisma.eds.create({
      data: {
        name: dataEds.name,
        url: dataEds.url,
        sequence: dataEds.sequence,
        bannerUrl: dataEds.bannerUrl,
        type: dataEds.type,
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
