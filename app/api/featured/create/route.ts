import { prisma } from "@/prisma/prisma-client";
import { Featured } from "@/types/featured";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  featured: Featured;
};

export async function POST(req: NextRequest) {
  const { featured }: Body = await req.json();
  try {
    const result = await prisma.featured.create({
      data: {
        type: featured.type,
        movieId: featured.movie.id as string,
      },
      include: {
        movie: true,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      { status: 403 }
    );
  }
}
