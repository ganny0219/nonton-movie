import { prisma } from "@/prisma/prisma-client";
import { Eds } from "@/types/eds";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  dataEds: Eds;
};

export async function PATCH(req: NextRequest) {
  try {
    const { dataEds }: Body = await req.json();
    const result = await prisma.eds.update({
      where: {
        id: dataEds.id,
      },
      data: {
        name: dataEds.name,
        url: dataEds.url,
        sequence: +dataEds.sequence,
        bannerUrl: dataEds.bannerUrl,
        type: dataEds.type,
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
