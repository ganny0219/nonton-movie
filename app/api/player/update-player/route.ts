import { prisma } from "@/prisma/prisma-client";
import { Episode, PlayerUrl, Season, Track } from "@/types/movie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  playerList: PlayerUrl[];
};

export async function PATCH(req: NextRequest) {
  const { playerList }: Body = await req.json();
  try {
    for await (let play of playerList) {
      await prisma.playerUrl.update({
        where: {
          id: play.id,
        },
        data: {
          name: play.name,
          url: play.url,
        },
      });
    }
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
