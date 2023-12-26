import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const playerServerName = req.nextUrl.searchParams.get("playerServerName");
  try {
    await prisma.playerUrl.deleteMany({
      where: {
        name: {
          contains: playerServerName as string,
          mode: "insensitive",
        },
      },
    });

    await prisma.episodePlayerUrl.deleteMany({
      where: {
        name: {
          contains: playerServerName as string,
          mode: "insensitive",
        },
      },
    });
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
