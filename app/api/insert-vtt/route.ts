import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const files = data.getAll("files") as File[];
  if (!files) {
    return NextResponse.json({ success: false });
  }
  for (let file of files) {
    const bytes = await file.arrayBuffer();
    const fileBuffer = Buffer.from(bytes);
    const filePath = process.cwd() + "/public/vtt/" + file.name;
    fs.writeFileSync(filePath, fileBuffer);
  }
  return NextResponse.json({ success: true });
}
