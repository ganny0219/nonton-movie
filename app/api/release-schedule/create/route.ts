import { prisma } from "@/prisma/prisma-client";
import { ReleaseSchedule } from "@/types/release-schedule";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  releaseSchedule: ReleaseSchedule;
};

export async function POST(req: NextRequest) {
  const { releaseSchedule }: Body = await req.json();
  try {
    const result = await prisma.releaseSchedule.create({
      data: {
        day: releaseSchedule.day,
        type: releaseSchedule.type,
        movieId: releaseSchedule.movie.id as string,
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
