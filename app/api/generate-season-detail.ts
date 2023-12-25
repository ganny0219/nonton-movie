import { createSlug, getImdbEpisodeDetail } from "@/utils/server-function/imdb";
import { getTmdbEpisodeDetail } from "@/utils/server-function/tmdb";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { imdbId, season, untilEps, mainTitle } = req.query;
  try {
    let episodes;
    if (imdbId?.includes("tt")) {
      episodes = await getImdbEpisodeDetail(
        imdbId as string,
        season as string,
        mainTitle as string
      );
    } else {
      episodes = await getTmdbEpisodeDetail(
        imdbId as string,
        season as string,
        mainTitle as string
      );
    }

    if (untilEps == "0") {
      return res.status(200).json({
        episode: episodes,
      });
    }

    const resultEpsiode = [];
    let count = 0;
    for await (let eps of episodes) {
      //@ts-ignore
      if (count < +untilEps) {
        resultEpsiode.push(eps);
      }
      count = count + 1;
    }

    return res.status(200).json({
      episode: resultEpsiode,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: error,
    });
  }
};

export default handler;
