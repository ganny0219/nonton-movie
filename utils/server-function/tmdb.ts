import { TmdbCast, TmdbEpisode, TmdbMovie, TmdbSeries } from "@/types/tmdb";
import { apiTmdb } from "../axios";
import { createSlugEpisode } from "../client-function/global";
import { Episode } from "@/types/movie";

function formatDate(inputDate: string) {
  const bulanNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [tahun, bulan, hari] = inputDate.split("-");
  const bulanFormatted = bulanNames[parseInt(bulan, 10) - 1];

  return `${bulanFormatted} ${parseInt(hari, 10)}, ${tahun}`;
}

function formatEpisodeDate(inputDate: string) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, month, day] = inputDate.split("-").map(Number);
  const jsDate = new Date(year, month - 1, day);
  const dayOfWeekName = daysOfWeek[jsDate.getUTCDay()];
  const monthName = months[jsDate.getUTCMonth()];

  return `${dayOfWeekName}, ${monthName} ${day}, ${year}`;
}

export const createSlug = (title: string, year: string) => {
  return (
    title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replaceAll(" ", "-") +
    "-" +
    year
  );
};

export const convertRuntime = (runtime: string) => {
  const containHour = runtime.includes("hour") || runtime.includes("hours");
  if (containHour) {
    const hourValue = +runtime.charAt(0);
    const hoursToMinute = hourValue * 60;
    const minValueIndex = runtime.indexOf("minutes");
    const minValue = +runtime.substring(minValueIndex - 3, minValueIndex - 1);
    const result = `${hoursToMinute + minValue} min`;
    return result;
  }
  return runtime;
};

export const convertReleased = (release: string) => {
  return release.substring(5, release.length);
};

export const getTmdbDetailSeries = async (imdbId: string) => {
  const tmdbData: TmdbSeries = await apiTmdb(
    `https://api.themoviedb.org/3/tv/${imdbId}?language=en-US`
  ).then((res) => res.data);

  const actorList: TmdbCast[] = await apiTmdb(
    `https://api.themoviedb.org/3/tv/${imdbId}/aggregate_credits?language=en-US`
  ).then((res) => res.data.cast);

  const genre = Array.from(tmdbData.genres, (e) => {
    return { name: e.name.split(" ")[0] };
  });

  const writer = Array.from(actorList, (e) => {
    if ((e.known_for_department = "Writing")) {
      const name = e.name;
      const as = "Writer";
      const imageUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.profile_path}`;
      return {
        name: name ? name : "",
        as: as ? as : "",
        imageUrl: imageUrl ? imageUrl : "",
      };
    }
  });

  const director = Array.from(actorList, (e) => {
    if ((e.known_for_department = "Directing")) {
      const name = e.name;
      const as = "Director";
      const imageUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.profile_path}`;
      return {
        name: name ? name : "",
        as: as ? as : "",
        imageUrl: imageUrl ? imageUrl : "",
      };
    }
  });

  const actor = Array.from(actorList, (e) => {
    const name = e.name;
    const as = e.character;
    const imageUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.profile_path}`;
    return {
      name: name ? name : "",
      as: as ? as : "",
      imageUrl: imageUrl ? imageUrl : "",
    };
  });
  const title = tmdbData.name;
  const rated = "R";
  const poster = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${tmdbData.poster_path}`;
  const released = formatDate(tmdbData.first_air_date);
  let country = tmdbData.production_countries[0]?.name;
  const language = tmdbData.production_countries[0]?.name;
  const runtime = `${
    tmdbData.episode_run_time[0] ? tmdbData.episode_run_time[0] : 0
  } min`;
  const year = tmdbData.first_air_date.substring(0, 4);
  const plot = tmdbData.overview;

  const slug = createSlug(title as string, year?.substring(0, 4) as string);
  if (country?.toLocaleLowerCase().includes("korea")) {
    country = "South Korea";
  } else if (country?.toLocaleLowerCase().includes("united state")) {
    country = "United States";
  }
  return {
    title: title ? title : "",
    slug: slug ? slug : "",
    rated: rated ? rated : "",
    poster: poster ? poster : "",
    genre: genre ? genre : [],
    actor: actor ? actor : [],
    writer: writer ? writer : [],
    director: director ? director : [],
    released: released ? released : "",
    country: {
      name: country ? country : "",
    },
    language: language ? language : "",
    runtime: runtime ? runtime : "",
    plot: plot ? plot : "",
    year: year ? year : "",
  };
};

export const getTmdbDetailMovie = async (imdbId: string) => {
  const tmdbData: TmdbMovie = await apiTmdb(
    `https://api.themoviedb.org/3/movie/${imdbId}?language=en-US`
  ).then((res) => res.data);

  const actorList: TmdbCast[] = await apiTmdb(
    `https://api.themoviedb.org/3/movie/${imdbId}/credits?language=en-US`
  ).then((res) => res.data.cast);

  const genre = Array.from(tmdbData.genres, (e) => {
    return { name: e.name.split(" ")[0] };
  });

  const writer = Array.from(actorList, (e) => {
    if ((e.known_for_department = "Writing")) {
      const name = e.name;
      const as = "Writer";
      const imageUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.profile_path}`;
      return {
        name: name ? name : "",
        as: as ? as : "",
        imageUrl: imageUrl ? imageUrl : "",
      };
    }
  });

  const director = Array.from(actorList, (e) => {
    if ((e.known_for_department = "Directing")) {
      const name = e.name;
      const as = "Director";
      const imageUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.profile_path}`;
      return {
        name: name ? name : "",
        as: as ? as : "",
        imageUrl: imageUrl ? imageUrl : "",
      };
    }
  });

  const actor = Array.from(actorList, (e) => {
    if ((e.known_for_department = "Acting")) {
      const name = e.name;
      const as = e.character;
      const imageUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${e.profile_path}`;
      return {
        name: name ? name : "",
        as: as ? as : "",
        imageUrl: imageUrl ? imageUrl : "",
      };
    }
  });

  const title = tmdbData.title;
  const rated = "R";
  const poster = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${tmdbData.poster_path}`;
  const released = formatDate(tmdbData.release_date);
  let country = tmdbData.production_countries[0].name;
  const language = tmdbData.production_countries[0].name;
  const runtime = `${tmdbData.runtime} min`;
  const year = tmdbData.release_date.substring(0, 4);
  const plot = tmdbData.overview;
  const slug = createSlug(title as string, year as string);
  if (country?.toLocaleLowerCase().includes("korea")) {
    country = "South Korea";
  } else if (country?.toLocaleLowerCase().includes("united state")) {
    country = "United States";
  }
  return {
    title: title ? title : "",
    slug: slug ? slug : "",
    rated: rated ? rated : "",
    poster: poster ? poster : "",
    genre: genre ? genre : [],
    writer: writer ? writer : [],
    director: director ? director : [],
    actor: actor ? actor : [],
    released: released ? released : "",
    country: {
      name: country ? country : "",
    },
    language: language ? language : "",
    runtime: runtime ? runtime : "",
    plot: plot ? plot : "",
    year: year ? year : "",
  };
};

export const getTmdbEpisodeDetail = async (
  imdbId: string,
  season: string,
  mainTitle: string
) => {
  const episodeData: TmdbEpisode[] = await apiTmdb(
    `https://api.themoviedb.org/3/tv/${imdbId}/season/${season}?language=en-US`
  ).then((res) => res.data.episodes);
  const seriesTitle = mainTitle;
  const episode: any = [];
  Array.from(episodeData, async (e) => {
    const title = e.name;
    const slug = createSlugEpisode(
      seriesTitle as string,
      season,
      e.episode_number
    );
    const released = formatEpisodeDate(e.air_date);
    const plot = e.overview;
    const poster = `https://www.themoviedb.org/t/p/w227_and_h127_bestv2${e.still_path}`;
    episode.push({
      slug: slug,
      sequence: e.episode_number,
      released: released ? released : "",
      title: title ? title : "",
      plot: plot ? plot : "",
      poster: poster ? poster : "",
      views: 0,
      vote: [],
      track: [],
      rating: "10",
      totalRating: 10,
      playerUrl: [],
    });
  });
  return episode;
};

export const getTmdbNewEpisodeDetail = async (
  imdbId: string,
  season: string,
  sequence: string,
  mainTitle: string
) => {
  const episodeData: TmdbEpisode[] = await apiTmdb(
    `https://api.themoviedb.org/3/tv/${imdbId}/season/${season}?language=en-US`
  ).then((res) => res.data.episodes);
  const seriesTitle = mainTitle;
  const title = episodeData[+sequence].name;
  const slug = createSlugEpisode(
    seriesTitle as string,
    season,
    episodeData[+sequence].episode_number
  );
  const released = formatEpisodeDate(episodeData[+sequence].air_date);
  const plot = episodeData[+sequence].overview;
  const poster = `https://www.themoviedb.org/t/p/w227_and_h127_bestv2${
    episodeData[+sequence].still_path
  }`;
  return {
    slug: slug,
    sequence: episodeData[+sequence].episode_number,
    released: released ? released : "",
    title: title ? title : "",
    plot: plot ? plot : "",
    poster: poster ? poster : "",
    views: 0,
    vote: [],
    track: [],
    rating: "10",
    totalRating: 10,
    playerUrl: [],
  };
};
