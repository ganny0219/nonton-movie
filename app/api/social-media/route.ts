import { prisma } from "@/prisma/prisma-client";
import { SocialMedia } from "@/types/social-media";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await prisma.socialMedia.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}

type Body = {
  socialMediaData: SocialMedia;
};
export async function POST(request: Request) {
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

// export async function DELETE(request: Request) {
//   try {
//     const { socialMediaId } = request.query;
//     const result = await prisma.socialMedia.delete({
//       where: {
//         id: socialMediaId as string,
//       },
//     });
//     return NextResponse.json(result, { status: 201 });
//   } catch (err) {
//     return NextResponse.json({ message: err }, { status: 403 });
//   }
// }

export async function PUT(request: Request) {
  try {
    const { socialMediaData }: Body = await request.json();
    const result = await prisma.socialMedia.update({
      where: {
        id: socialMediaData.id,
      },
      data: {
        name: socialMediaData.name,
        url: socialMediaData.url,
        logoUrl: socialMediaData.logoUrl,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 403 });
  }
}
