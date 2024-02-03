// import { convertPoster } from "@/utils/server-function/imdb";
import { NextResponse } from "next/server";

export async function GET() {
  // await convertPoster();
  return NextResponse.json({ status: "ok" });
}
