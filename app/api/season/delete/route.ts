import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const seasonId = req.nextUrl.searchParams.get("seasonId");
  try {
    const result = await prisma.season.delete({
      where: {
        id: seasonId as string,
      },
      include: {
        episode: true,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
