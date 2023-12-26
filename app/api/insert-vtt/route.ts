import { prisma } from "@/prisma/prisma-client";
import { Season } from "@/types/movie";
import { convertEpisodeDateTimestamp } from "@/utils/client-function/global";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { cwd } from "process";

interface MulterRequest extends NextApiRequest {
  files: any;
}

export const config = {
  api: {
    bodyParser: false, // Matikan parsing bawaan permintaan yang masuk
  },
};

const multer = require("multer");
const storage = multer.diskStorage({
  //@ts-ignore
  destination: function (req, file, cb) {
    cb(null, `./public/vtt`);
  },
  //@ts-ignore
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export async function POST(req: MulterRequest, res: NextApiResponse) {
  upload.fields([{ name: "files" }])(req, res, (err: Error) => {
    if (err) {
      return NextResponse.json({ error: err.message }, { status: 403 });
    }
    return NextResponse.json({ message: "File diunggah" }, { status: 200 });
  });
}
