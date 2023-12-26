import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { movieId } = await req.json();
  try {
    const result = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      { status: 403 }
    );
  }
}
