import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { seasonId } = req.query;
  try {
    const result = await prisma.season.delete({
      where: {
        id: seasonId as string,
      },
      include: {
        episode: true,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(403).json(err);
  }
}

export default handler;
