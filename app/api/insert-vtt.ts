import { prisma } from "@/prisma/prisma-client";
import { Season } from "@/types/movie";
import { convertEpisodeDateTimestamp } from "@/utils/client-function/global";
import { NextApiRequest, NextApiResponse } from "next";
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

export default (req: MulterRequest, res: NextApiResponse) => {
  upload.fields([{ name: "files" }])(req, res, (err: Error) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send("File diunggah");
  });
};
