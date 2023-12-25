import { prisma } from "@/prisma/prisma-client";
import { Episode, PlayerUrl, Season } from "@/types/movie";
import { apiAxios } from "@/utils/axios";
import { convertEpisodeDateTimestamp } from "@/utils/client-function/global";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  episode: Episode;
  seasonId: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { episode, seasonId }: Body = req.body;

  try {
    const result = await prisma.episode.create({
      data: {
        seasonId: seasonId,
        sequence: +episode.sequence,
        title: episode.title,
        plot: episode.plot,
        rating: episode.rating.toString(),
        totalRating: episode.totalRating,
        slug: episode.slug,
        views: episode.views,
        released: episode.released,
        releasedTimestamp: episode.released
          ? convertEpisodeDateTimestamp(episode.released)
          : "",
        poster: episode.poster,
        vote: {
          set: episode.vote,
        },
        playerUrl: {
          create: episode.playerUrl.map((player) => {
            return {
              name: player.name,
              url: player.url,
            };
          }),
        },
      },
      include: {
        playerUrl: true,
        track: true,
      },
    });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
