import { Episode } from "./movie";

export type PlayerServer = {
  id?: string;
  baseUrl: string;
  name: string;
};

export type PlayerServerJson = {
  [key: string]: PlayerServer;
};

export interface GoogleGenereateData {
  [key: string]: any;
  googleId: string;
  abyss: boolean;
  playerx: boolean;
  episode: Episode;
}

// export type GoogleGenereateEpisodeResult = {
//   abyss: string;
//   playerx: string;
// };

export type GoogleGenereateResult = {
  abyss: string;
  playerx: string;
};
