import { prisma } from "@/prisma/prisma-client";
import {
  createSlug,
  getImdbDetailMovie,
  getImdbDetailSeries,
} from "@/utils/server-function/imdb";
import {
  getTmdbDetailMovie,
  getTmdbDetailSeries,
} from "@/utils/server-function/tmdb";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { imdbId, type, create } = req.query;
  try {
    if (create == "true") {
      const duplicate = await prisma.movie.count({
        where: {
          imdbId: imdbId as string,
        },
      });
      if (duplicate > 0) {
        return res.status(422).json({ message: "Duplicate Data" });
      }
    }
    let detail = undefined;
    if (type == "movie") {
      if (imdbId?.includes("tt")) {
        detail = await getImdbDetailMovie(imdbId as string);
      } else {
        detail = await getTmdbDetailMovie(imdbId as string);
      }
      return res.status(200).json({
        ...detail,
        imdbId: imdbId,
      });
    } else {
      if (imdbId?.includes("tt")) {
        detail = await getImdbDetailSeries(imdbId as string);
      } else {
        detail = await getTmdbDetailSeries(imdbId as string);
      }
      return res.status(200).json({
        ...detail,
        imdbId: imdbId,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: err });
  }
};

export default handler;
