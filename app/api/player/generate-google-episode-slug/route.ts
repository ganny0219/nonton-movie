import { prisma } from "@/prisma/prisma-client";
import { Episode, PlayerUrl, Season, Track } from "@/types/movie";
import {
  GoogleGenereateData,
  GoogleGenereateResult,
} from "@/types/player-server";
import { apiAxios } from "@/utils/axios";
import { getPlayerServerListJson } from "@/utils/server-function/player-server";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  googleGenerateData: GoogleGenereateData[];
  update?: boolean;
  movieTitle: string;
  imdbId: string;
  season: number;
  movieType: string;
};

export async function POST(req: NextRequest) {
  try {
    const { googleGenerateData, update }: Body = await req.json();
    const episodeList: Episode[] = [];
    const playerServerList = await getPlayerServerListJson();

    for await (let googleData of googleGenerateData) {
      const googleId = googleData.googleId
        .replace("https://drive.google.com/file/d/", "")
        .replace("/view?usp=drive_link", "");

      let generateResult: GoogleGenereateResult = {
        playerx: "",
        abyss: "",
      };
      if (googleData.playerx && googleId != "") {
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
      if (googleData.abyss && googleId != "") {
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
        if (googleData.abyss && googleId != "") {
          const playerAbyss = googleData.episode.playerUrl.find(
            (player) => player.name.toLowerCase() == "abyss"
          );
          await prisma.episodePlayerUrl.update({
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
        if (googleData.playerx && googleId != "") {
          const playerPlayerx = googleData.episode.playerUrl.find(
            (player) => player.name.toLowerCase() == "playerx"
          );
          await prisma.episodePlayerUrl.update({
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
      //       season: season + 1,
      //       episode: googleData.episode.sequence,
      //       movieType: movieType,
      //     },
      //   });
      // }
      const newPlayerUrl = [];
      for await (let player of googleData.episode.playerUrl) {
        if (player.name == "Abyss" && generateResult.abyss) {
          newPlayerUrl.push({
            ...player,
            url: generateResult.abyss,
          });
        } else if (player.name == "Playerx" && generateResult.playerx) {
          newPlayerUrl.push({
            ...player,
            url: generateResult.playerx,
          });
        } else {
          newPlayerUrl.push({
            ...player,
          });
        }
      }
      const newEpisode: Episode = {
        ...googleData.episode,
        playerUrl: newPlayerUrl,
      };
      episodeList.push(newEpisode);
    }
    return NextResponse.json(episodeList, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 403 });
  }
}
