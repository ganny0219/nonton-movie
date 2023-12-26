import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const requestIp = require("request-ip");

type Body = {
  lastVote: string[];
  movieId: string;
  star: number;
  lastTotalRating: number;
};

export async function PATCH(req: NextResponse) {
  try {
    const { lastVote, movieId, star, lastTotalRating }: Body = await req.json();
    let newRating = "0";
    let totalRating = 0;
    if (lastVote.length == 0) {
      newRating = star.toString();
      totalRating = star;
    } else {
      newRating = (
        (+lastTotalRating + star) /
        (lastVote.length + 1)
      ).toString();
      totalRating = lastTotalRating + star;
    }

    let duplicate = false;
    const ip = requestIp.getClientIp(req);
    // lastVote.map((lastIp) => {
    //   if (lastIp == ip) {
    //     duplicate = true;
    //   }
    // });

    if (!duplicate) {
      const result = await prisma.movie.update({
        where: {
          id: movieId,
        },
        data: {
          vote: {
            push: ip,
          },
          rating: {
            set: newRating,
          },
          totalRating: totalRating,
        },
      });
      return NextResponse.json(result, { status: 200 });
    }
    return NextResponse.json(
      { message: "not allow vote two times" },
      { status: 402 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      { status: 403 }
    );
  }
}
