import { Episode, PlayerUrl, Track } from "./movie";
import { PlayerServer } from "./player-server";

export type UpdateSeasonAction = {
  payload: {
    key: string;
    value: string;
    index: number;
  };
};

export type InserEpisodeAction = {
  payload: {
    playerServerList: PlayerServer[];
    movieTitle: string;
    seasonIndex: number;
    lastEpisodeSquence: number;
  };
};

export type DeleteEpisodeAction = {
  payload: {
    episodeIndex: number;
    seasonIndex: number;
  };
};

export type UpdateAllEpisodeAction = {
  payload: {
    episodeData: Episode[];
    seasonIndex: number;
  };
};

export type GenerateEpisodeAction = {
  payload: {
    episodeData: Episode[];
    seasonIndex: number;
    seasonReleased: string;
  };
};

export type InsertNewEpisodeAction = {
  payload: {
    seasonIndex: number;
    newEpisodeData: Episode;
  };
};

export type UpdateEpisodeAction = {
  payload: {
    key: string;
    value: string | PlayerUrl[] | Track[];
    seasonIndex: number;
    episodeIndex: number;
  };
};
