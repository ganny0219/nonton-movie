export type ImdbSelectorData = {
  [key: string]: ImdbSelector;
  movie: ImdbSelector;
  series: ImdbSelector;
  episode: ImdbSelector;
};

export type ImdbSelector = {
  [key: string]: string;
  name: string;
  mainTitle: string;
  episodeTitle: string;
  episodeArray: string;
  rated: string;
  poster: string;
  genre: string;
  released: string;
  country: string;
  language: string;
  runtime: string;
  plot: string;
  year: string;
  writer: string;
  director: string;
  actorArray: string;
  actorName: string;
  actorAs: string;
  actorImage: string;
};

export type ImdbMovieSelector = {
  title: string;
  rated: string;
  poster: string;
  genre: string;
  cast: string;
  released: string;
  country: string;
  language: string;
  runtime: string;
  plot: string;
  year: string;
};

export type ImdbSeriesSelector = {
  title: string;
  rated: string;
  poster: string;
  cast: string;
  released: string;
  country: string;
  language: string;
  runtime: string;
  plot: string;
  year: string;
  genre: string;
};

export type ImdbEpisodeSelector = {
  released: string;
  title: string;
  plot: string;
  poster: string;
};
