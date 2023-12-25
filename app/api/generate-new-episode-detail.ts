import {
  createSlug,
  getImdbEpisodeDetail,
  getImdbNewEpisodeDetail,
} from "@/utils/server-function/imdb";
import {
  getTmdbEpisodeDetail,
  getTmdbNewEpisodeDetail,
} from "@/utils/server-function/tmdb";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { imdbId, season, sequence, mainTitle } = req.query;
  try {
    let episode;
    if (imdbId?.includes("tt")) {
      episode = await getImdbNewEpisodeDetail(
        imdbId as string,
        season as string,
        sequence as string,
        mainTitle as string
      );
    } else {
      episode = await getTmdbNewEpisodeDetail(
        imdbId as string,
        season as string,
        sequence as string,
        mainTitle as string
      );
    }

    return res.status(200).json(episode);
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: error,
    });
  }
};

export default handler;
