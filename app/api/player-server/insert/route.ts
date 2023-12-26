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

export async function POST(req: NextRequest) {
  const { playerServer }: Body = await req.json();
  try {
    const result = await prisma.playerServer.create({
      data: {
        name: playerServer.name,
        baseUrl: playerServer.baseUrl,
      },
    });
    await apiAxios
      .post(`/player/insert-player-server`, {
        playerServer: playerServer,
      })
      .then((res) => res.data);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
