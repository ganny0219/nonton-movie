export type TmdbGenre = {
  id: string;
  name: string;
};

export type TmdbProduction = {
  iso_3166_1: string;
  name: string;
};

export type TmdbMovie = {
  genres: TmdbGenre[];
  overview: string;
  poster_path: string;
  production_countries: TmdbProduction[];
  release_date: string;
  runtime: number;
  title: string;
};

export type TmdbSeries = {
  episode_run_time: number[];
  first_air_date: string;
  genres: TmdbGenre[];
  id: number;
  last_episode_to_air: {
    id: number;
    name: String;
    air_date: string;
    episode_number: number;
    season_number: number;
    overview: string;
  };
  name: string;
  overview: string;
  poster_path: string;
  production_countries: TmdbProduction[];
};

export type TmdbCast = {
  name: string;
  profile_path: string;
  character: string;
  known_for_department: string;
};

export type TmdbEpisode = {
  slug: string;
  air_date: string;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string;
};
