import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { PlayerServer } from "@/types/player-server";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  playerServer: PlayerServer;
};

export async function PATCH(req: NextRequest) {
  const { playerServer }: Body = await req.json();
  try {
    await apiAxios
      .patch(`/player/update-player-server`, {
        playerServer: playerServer,
      })
      .then((res) => res.data);
    const result = await prisma.playerServer.update({
      where: {
        id: playerServer.id,
      },
      data: {
        name: playerServer.name,
        baseUrl: playerServer.baseUrl,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
