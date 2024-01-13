import { prisma } from "@/prisma/prisma-client";
import { Eds } from "@/types/eds";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const edsId = req.nextUrl.searchParams.get("edsId");
    const result = await prisma.eds.delete({
      where: {
        id: edsId as string,
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
