import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { episodeId } = await req.json();
  try {
    const result = await prisma.episode.update({
      where: {
        id: episodeId,
      },
      data: {
        views: {
          increment: 1,
        },
        season: {
          update: {
            movie: {
              update: {
                views: {
                  increment: 1,
                },
              },
            },
          },
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
