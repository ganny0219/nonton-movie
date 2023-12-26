import { prisma } from "@/prisma/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const releaseScheduleId = req.nextUrl.searchParams.get("releaseScheduleId");
  try {
    const result = await prisma.releaseSchedule.delete({
      where: {
        id: releaseScheduleId as string,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      { status: 403 }
    );
  }
}
