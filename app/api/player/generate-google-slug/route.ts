import { prisma } from "@/prisma/prisma-client";
import { Episode, PlayerUrl, Season, Track } from "@/types/movie";
import { GoogleGenereateResult } from "@/types/player-server";
import { apiAxios } from "@/utils/axios";
import { getPlayerServerListJson } from "@/utils/server-function/player-server";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Body = {
  googleId: string;
  selectedServer: {
    playerx: boolean;
    abyss: boolean;
  };
  playerList: PlayerUrl[];
  update?: boolean;
  imdbId: string;
  movieTitle: string;
  movieType: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      imdbId,
      movieTitle,
      googleId,
      selectedServer,
      playerList,
      update,
      movieType,
    }: Body = req.body;

    let generateResult: GoogleGenereateResult = {
      playerx: "",
      abyss: "",
    };
    const playerServerList = await getPlayerServerListJson();

    if (selectedServer.playerx) {
      await axios
        .get(
          `https://www.playerx.stream/api.php?url=https://drive.google.com/${googleId}&api_key=${process.env.NEXT_PUBLIC_PLAYERX_API_KEY}`
        )
        .then((res) => {
          if (res.data.result) {
            generateResult = {
              ...generateResult,
              playerx: res.data.content,
            };
          }
        });
    }
    if (selectedServer.abyss) {
      await axios
        .get(
          `https://api.hydrax.net/${process.env.NEXT_PUBLIC_ABYSS_API_KEY}/drive/${googleId}`
        )
        .then((res) => {
          if (res.data.status) {
            generateResult = {
              ...generateResult,
              abyss: playerServerList.abyss + res.data.slug,
            };
          }
        });
    }
    if (update) {
      if (selectedServer.abyss) {
        const playerAbyss = playerList.find(
          (player) => player.name.toLowerCase() == "abyss"
        );
        await prisma.playerUrl.update({
          where: {
            id: playerAbyss?.id,
            name: {
              contains: "abyss",
              mode: "insensitive",
            },
          },
          data: {
            url: generateResult.abyss,
          },
        });
      }
      if (selectedServer.playerx) {
        const playerPlayerx = playerList.find(
          (player) => player.name.toLowerCase() == "playerx"
        );
        await prisma.playerUrl.update({
          where: {
            id: playerPlayerx?.id,
            name: {
              contains: "playerx",
              mode: "insensitive",
            },
          },
          data: {
            url: generateResult.playerx,
          },
        });
      }
    }

    // if (
    //   movieType == "anime" &&
    //   (generateResult.abyss || generateResult.playerx)
    // ) {
    //   await apiAxios.post(`/google-drive/upsert`, {
    //     googleDriveData: {
    //       googleId: googleId,
    //       imdbId: imdbId,
    //       movieTitle: movieTitle,
    //       season: 0,
    //       episode: 0,
    //     },
    //   });
    // }
    res.status(200).json(generateResult);
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
}

export default handler;
