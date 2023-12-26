import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const googleId = req.nextUrl.searchParams.get("googleId");
  try {
    const result = await prisma.googleDrive.delete({
      where: {
        googleId: googleId as string,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 403 });
  }
}
