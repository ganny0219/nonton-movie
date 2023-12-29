import { prisma } from "@/prisma/prisma-client";
import { SocialMedia } from "@/types/social-media";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const socialMediaId = request.nextUrl.searchParams.get("socialMediaId");
    const result = await prisma.socialMedia.delete({
      where: {
        id: socialMediaId as string,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
