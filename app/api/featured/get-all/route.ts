import { prisma } from "@/prisma/prisma-client";
import { FeaturedData } from "@/types/featured";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.featured.findMany({
      include: {
        movie: {
          include: {
            season: {
              include: {
                movie: true,
                episode: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    let finalResult: FeaturedData = {
      home: [],
      movie: [],
      series: [],
      anime: [],
      drakor: [],
    };
    for await (let featured of result) {
      finalResult = {
        ...finalResult,
        [featured.type.toLowerCase()]:
          finalResult[featured.type.toLowerCase()]?.length > 0
            ? [...finalResult[featured?.type?.toLowerCase()], featured]
            : [featured],
      };
    }
    return NextResponse.json(finalResult, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      { status: 403 }
    );
  }
}
