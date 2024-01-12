import { Episode, MovieStore, PlayerUrl } from "@/types/movie";
import {
  DeleteEpisodeAction,
  GenerateEpisodeAction,
  InserEpisodeAction,
  InsertNewEpisodeAction,
  UpdateAllEpisodeAction,
  UpdateEpisodeAction,
  UpdateSeasonAction,
} from "@/types/movie-store";
import { PlayerServer } from "@/types/player-server";
import { createSlugEpisode } from "@/utils/client-function/global";
import { createSlice } from "@reduxjs/toolkit";

const defaultState: MovieStore = {
  title: "",
  originalTitle: "",
  year: "",
  rated: "",
  released: "",
  runtime: "",
  genre: [],
  director: [],
  writer: [],
  plot: "",
  language: "",
  country: {
    name: "",
  },
  poster: "",
  imdbId: "",
  type: "",
  production: "Official",
  playerUrl: [],
  track: [],
  trailerUrl: "",
  views: 0,
  slug: "",
  actor: [],
  featured: [],
  rating: "10",
  totalRating: 10,
  resolution: "HD",
  season: [],
  vote: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState: defaultState,
  reducers: {
    updateMovieData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setMovieData: () => {
      return {
        ...defaultState,
        type: "movie",
        production: "Official",
      };
    },
    setSeriesData: () => {
      return {
        ...defaultState,
        type: "series",
        production: "Official",
      };
    },
    setAnimeData: () => {
      return {
        ...defaultState,
        type: "anime",
      };
    },
    setDrakorData: () => {
      return {
        ...defaultState,
        type: "drama-korea",
        production: "Official",
      };
    },
    insertSeasonData: (state, action) => {
      state.season.push({ ...action.payload });
      return state;
    },
    updateSeasonData: (state, action: UpdateSeasonAction) => {
      const { index, key, value } = action.payload;
      state.season[index] = {
        ...state.season[index],
        [key]: value,
      };
      return state;
    },
    deleteSeasonData: (state, action: { payload: { index: number } }) => {
      const { index } = action.payload;
      state.season.splice(index, 1);
      return state;
    },
    insertEpisodeData: (state, action: InserEpisodeAction) => {
      const { playerServerList, movieTitle, seasonIndex, lastEpisodeSquence } =
        action.payload;
      const newPlayer: PlayerUrl[] = [];
      const sequence = lastEpisodeSquence ? lastEpisodeSquence + 1 : 1;

      for (let playServer of playerServerList) {
        newPlayer.push({
          name: playServer.name,
          url: playServer.baseUrl,
        });
      }
      const slug = createSlugEpisode(
        movieTitle,
        (seasonIndex + 1).toString(),
        sequence
      );
      state.season[seasonIndex].episode.unshift({
        slug: slug,
        sequence: sequence,
        released: "",
        title: "",
        plot: "",
        poster: "",
        views: 0,
        vote: [],
        track: [],
        rating: "10",
        totalRating: 10,
        playerUrl: newPlayer.reverse(),
      });
      return state;
    },
    insertNewEpisodeData: (state, action: InsertNewEpisodeAction) => {
      const { newEpisodeData, seasonIndex } = action.payload;
      state.season[seasonIndex].episode.unshift(newEpisodeData);
      return state;
    },
    generateEpisodeData: (state, action: GenerateEpisodeAction) => {
      const { seasonIndex, episodeData, seasonReleased } = action.payload;
      state.season[seasonIndex].released = seasonReleased;
      state.season[seasonIndex].episode = episodeData;
      return state;
    },
    updateAllEpisodeData: (state, action: UpdateAllEpisodeAction) => {
      const { seasonIndex, episodeData } = action.payload;
      state.season[seasonIndex].episode = episodeData;
      return state;
    },
    updateEpisodeData: (state, action: UpdateEpisodeAction) => {
      const { seasonIndex, key, value, episodeIndex } = action.payload;
      state.season[seasonIndex].episode[episodeIndex] = {
        ...state.season[seasonIndex].episode[episodeIndex],
        [key]: value,
      };
      return state;
    },
    deleteEpisodeData: (state, action: DeleteEpisodeAction) => {
      const { episodeIndex, seasonIndex } = action.payload;
      state.season[seasonIndex].episode.splice(episodeIndex, 1);
      return state;
    },
  },
});

export const {
  updateMovieData,
  setAnimeData,
  setDrakorData,
  setMovieData,
  setSeriesData,
  deleteEpisodeData,
  deleteSeasonData,
  insertEpisodeData,
  insertNewEpisodeData,
  insertSeasonData,
  updateAllEpisodeData,
  updateEpisodeData,
  updateSeasonData,
  generateEpisodeData,
} = movieSlice.actions;

export const movieReducer = movieSlice.reducer;
