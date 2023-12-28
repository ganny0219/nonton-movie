import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";

export async function GET(req: NextRequest) {
  const fileName = req.url.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`, "");
  const fileVtt = fs.readFileSync(process.cwd() + "/public" + fileName);
  return new Response(fileVtt);
}
