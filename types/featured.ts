import { Movie } from "./movie";

export type FeaturedType =
  | "drakor"
  | "anime"
  | "movie"
  | "series"
  | "home"
  | "";

export type FeaturedData = {
  [key: string]: any;
  home: Featured[];
  movie: Featured[];
  series: Featured[];
  anime: Featured[];
  drakor: Featured[];
};

export type Featured = {
  [key: string]: any;
  id?: string;
  type: string;
  movie: Movie;
};
