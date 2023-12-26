import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search");
    if (search != "" && search?.length ? search?.length > 1 : true) {
      const movie = await prisma.movie.findMany({
        where: {
          title: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        orderBy: {
          releasedTimestamp: "desc",
        },
        take: 5,
      });
      return NextResponse.json(movie, { status: 200 });
    }
    return NextResponse.json([], { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      { status: 403 }
    );
  }
}
