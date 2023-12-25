import { prisma } from "@/prisma/prisma-client";
import { ReleaseSchedule } from "@/types/release-schedule";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  releaseSchedule: ReleaseSchedule;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { releaseSchedule }: Body = req.body;
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
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({
      message: err,
    });
  }
}

export default handler;
