import { prisma } from "@/prisma/prisma-client";
import { SocialMedia } from "@/types/social-media";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  socialMediaData: SocialMedia;
};
export async function POST(request: NextRequest) {
  try {
    const { socialMediaData }: Body = await request.json();
    const result = await prisma.socialMedia.create({
      data: {
        name: socialMediaData.name,
        url: socialMediaData.url,
        logoUrl: socialMediaData.logoUrl,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
