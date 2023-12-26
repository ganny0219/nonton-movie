import { prisma } from "@/prisma/prisma-client";
import { Movie } from "@/types/movie";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const playerServerId = req.nextUrl.searchParams.get("playerServerId");
  const playerServerName = req.nextUrl.searchParams.get("playerServerName");
  try {
    const result = await prisma.playerServer.delete({
      where: {
        id: playerServerId as string,
      },
    });
    await apiAxios
      .delete(`/player/delete-player-server`, {
        params: {
          playerServerName: playerServerName,
        },
      })
      .then((res) => res.data);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
