import { prisma } from "@/prisma/prisma-client";
import { Actor, Director, Writer } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  removedCast: string[];
  castData: Actor[] | Writer[] | Director[];
  movieId: string;
  type: string;
};

export async function PATCH(req: NextRequest) {
  const { removedCast, castData, movieId, type }: Body = await req.json();
  try {
    const result = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        [type]: {
          disconnect: removedCast.map((cast) => {
            return {
              name: cast,
            };
          }),
          connectOrCreate: castData.map((cast) => {
            return {
              where: {
                name: cast.name,
              },
              create: {
                name: cast.name,
                as: cast.as,
                imageUrl: cast.imageUrl,
              },
            };
          }),
        },
      },
      include: {
        actor: true,
        director: true,
        writer: true,
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
