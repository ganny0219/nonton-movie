import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { featuredId } = req.query;
  try {
    const result = await prisma.featured.delete({
      where: {
        id: featuredId as string,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({
      message: err,
    });
  }
}

export default handler;
