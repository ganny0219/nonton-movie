import { prisma } from "@/prisma/prisma-client";
import { Featured } from "@/types/featured";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  featured: Featured;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { featured }: Body = req.body;
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
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({
      message: err,
    });
  }
}

export default handler;
