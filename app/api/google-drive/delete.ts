import { prisma } from "@/prisma/prisma-client";
import { Episode, Season } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { googleId } = req.query;
  try {
    const result = await prisma.googleDrive.delete({
      where: {
        googleId: googleId as string,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(403).json(err);
  }
}

export default handler;
