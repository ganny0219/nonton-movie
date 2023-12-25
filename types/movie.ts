import { Featured } from "./featured";

export type MovieType = "drama-korea" | "anime" | "movie" | "series" | "";

export interface MovieBase {
  [key: string]: any;
  id?: string;
  type: string;
  title: string;
  slug: string;
  trailerUrl: string;
  resolution: string;
  vote: string[];
  year: string;
  rated: string;
  released: string;
  releasedTimestamp?: string;
  runtime: string;
  plot: string;
  language: string;
  country: string;
  poster: string;
  rating: string;
  totalRating: number;
  imdbId: string;
  production: string;
  views: number;
}

export interface Movie extends MovieBase {
  [key: string]: any;
  featured: Featured[];
  genre: Genre[];
  director: Director[];
  writer: Writer[];
  actor: Actor[];
  playerUrl: PlayerUrl[];
  track: Track[];
  season: Season[];
}

export interface MovieStore extends MovieBase {
  [key: string]: any;
  genre: Genre[];
  director: Director[];
  writer: Writer[];
  actor: Actor[];
  playerUrl: PlayerUrl[];
  track: Track[];
  season: Season[];
}

export interface MovieBySlug extends MovieBase {
  [key: string]: any;
  genre: Genre[];
  director: Director[];
  writer: Writer[];
  actor: Actor[];
  playerUrl: PlayerUrl[];
  track: Track[];
}

export interface MovieById extends MovieBase {
  genre: Genre[];
  director: Director[];
  writer: Writer[];
  actor: Actor[];
  track: Track[];
  playerUrl: PlayerUrl[];
  season: {
    id: string;
    slug: string;
    name: string;
    sequence: number;
    trailerUrl: string;
    released: string;
    releasedTimestamp: string;
    poster: string;
    vote: string[];
    rating: string;
    totalRating: number;
    episode: {
      id: string;
      slug: string;
      sequence: number;
      released: string;
      releasedTimestamp?: string;
      title: string;
      plot: string;
      rating: string;
      totalRating: number;
      vote: string[];
      poster: string;
      views: number;
      playerUrl: PlayerUrl[];
      track: Track[];
    }[];
  }[];
}

export interface SeasonBase {
  id?: string;
  slug: string;
  name: string;
  sequence: number;
  trailerUrl: string;
  released: string;
  releasedTimestamp?: string;
  poster: string;
  vote: string[];
  rating: string;
  totalRating: number;
}

export interface Season extends SeasonBase {
  movie: Movie;
  episode: Episode[];
}

export interface EpisodeBase {
  id?: string;
  slug: string;
  sequence: number;
  released: string;
  releasedTimestamp?: string;
  title: string;
  plot: string;
  rating: string;
  totalRating: number;
  vote: string[];
  poster: string;
  views: number;
}

export interface Episode extends EpisodeBase {
  season?: Season;
  playerUrl: PlayerUrl[];
  track: Track[];
}

export interface EpisodeStore extends EpisodeBase {
  seasondId?: string;
  playerUrl: PlayerUrl[];
  track: Track[];
}

export interface EpisodeBySlug extends EpisodeBase {
  season: {
    movie: MovieBase;
    episode: EpisodeBase[];
  };
  playerUrl: PlayerUrl[];
  track: Track[];
}

export interface EpisodeCardType {
  id?: string;
  season?: SeasonBase;
  slug: string;
  sequence: number;
  released: string;
  releasedTimestamp?: string;
  title: string;
  plot: string;
  rating: string;
  totalRating: number;
  vote: string[];
  poster: string;
  views: number;
}

export interface EpisodePlayerList {
  [key: string]: EpisodePlayer[];
}

export interface EpisodePlayer extends PlayerUrl {
  episodeId?: string;
  sequence: number;
}

export interface Director {
  id?: string;
  as: string;
  name: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Writer {
  id?: string;
  name: string;
  as: string;
  imageUrl: string;
}

export interface Actor {
  id?: string;
  name: string;
  as: string;
  imageUrl: string;
}

export interface PlayerUrl {
  [key: string]: any;
  id?: string;
  name: string;
  url: string;
}

export interface Track {
  id?: string;
  language: string;
  episodeId?: string;
  movieId?: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Genre {
  [key: string]: any;
  id?: string;
  movie?: Movie[];
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
