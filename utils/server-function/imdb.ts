import { JsdomProps } from "@/types/global";
import { ImdbSelector } from "@/types/imdbSelector";

import { apiAxios, apiTmdb } from "../axios";
import { createSlugEpisode } from "../client-function/global";
import { getImdbSelector } from "./selector";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

export const getImdbDetailSeries = async (imdbId: string) => {
  const result = await fetch(`https://www.imdb.com/title/${imdbId}`);
  const html = await result.text();
  const { document }: JsdomProps = new JSDOM(html).window;
  const selector: ImdbSelector = await getImdbSelector("series");
  // const tmdbDetail = await apiTmdb(
  //   `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`
  // ).then((res) => res.data);

  const genre = Array.from(document.querySelectorAll(selector.genre), (e) => {
    return { name: e.textContent };
  });
  const writer = Array.from(document.querySelectorAll(selector.writer), (e) => {
    return { name: e.textContent, as: "Writer", imageUrl: "" };
  });
  const actor = Array.from(
    document.querySelectorAll(selector.actorArray),
    (e) => {
      const name = e.querySelector(selector.actorName)?.textContent;
      const as = e.querySelector(selector.actorAs)?.textContent;
      const imageUrl = e
        .querySelector(selector.actorImage)
        ?.getAttribute("src");
      return {
        name: name ? name : "",
        as: as ? as : "",
        imageUrl: imageUrl ? imageUrl : "",
      };
    }
  );
  const title = document.querySelector(selector.mainTitle)?.textContent;
  const rated = "R";
  const poster = document.querySelector(selector.poster)?.getAttribute("src");
  // const poster = tmdbDetail.tv_results[0]?.poster_path
  //   ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${tmdbDetail.tv_results[0]?.poster_path}`
  //   : "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
  const released = document.querySelector(selector.released)?.textContent;

  const releaseCountryIndex = released?.indexOf("(");

  let country = document.querySelector(selector.country)?.textContent;
  const language = document.querySelector(selector.language)?.textContent;
  const runtime = document.querySelector(selector.runtime)?.textContent;
  // const production = document.querySelector(
  //   '[data-testid="details-officialsites"] li:first-child'
  // )?.textContent;
  const year = document.querySelector(selector.year)?.textContent;
  const plot = document.querySelector(selector.plot)?.textContent;

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
    writer: writer ? writer : [],
    actor: actor ? actor : [],
    released: released
      ? released.substring(
          0,
          releaseCountryIndex ? releaseCountryIndex - 1 : undefined
        )
      : "",
    country: {
      name: country ? country : "",
    },
    language: language ? language : "",
    runtime: runtime ? convertRuntime(runtime) : "",
    plot: plot ? plot : "",

    year: year ? year.substring(0, 4) : "",
  };
};

export const getImdbDetailMovie = async (imdbId: string) => {
  const result = await fetch(`https://www.imdb.com/title/${imdbId}`);
  const html = await result.text();
  const { document }: JsdomProps = new JSDOM(html).window;
  const selector: ImdbSelector = await getImdbSelector("movie");
  // const tmdbDetail = await apiTmdb(
  //   `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`
  // ).then((res) => res.data);
  const genre = Array.from(document.querySelectorAll(selector.genre), (e) => {
    return { name: e.textContent };
  });
  const writer = Array.from(document.querySelectorAll(selector.writer), (e) => {
    return { name: e.textContent, as: "Writer", imageUrl: "" };
  });
  const director = Array.from(
    document.querySelectorAll(selector.director),
    (e) => {
      return { name: e.textContent, as: "Director", imageUrl: "" };
    }
  );
  const actor = Array.from(
    document.querySelectorAll(selector.actorArray),
    (e) => {
      const name = e.querySelector(selector.actorName)?.textContent;
      const as = e.querySelector(selector.actorAs)?.textContent;
      const imageUrl = e
        .querySelector(selector.actorImage)
        ?.getAttribute("src");
      return {
        name: name ? name : "",
        as: as ? as : "",
        imageUrl: imageUrl ? imageUrl : "",
      };
    }
  );
  const title = document.querySelector(selector.mainTitle)?.textContent;
  const rated = document.querySelector(selector.rated)?.textContent;
  // const poster = tmdbDetail.movie_results[0]?.poster_path
  //   ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${tmdbDetail.movie_results[0]?.poster_path}`
  //   : "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
  const poster = document.querySelector(selector.poster)?.getAttribute("src");
  const released = document.querySelector(selector.released)?.textContent;

  const releaseCountryIndex = released?.indexOf("(");
  let country = document.querySelector(selector.country)?.textContent;
  const language = document.querySelector(selector.language)?.textContent;
  const runtime = document.querySelector(selector.runtime)?.textContent;
  // const production = document.querySelector(
  //   '[data-testid="details-officialsites"] li:first-child'
  // )?.textContent;
  const year = document.querySelector(selector.year)?.textContent;
  const plot = document.querySelector(selector.plot)?.textContent;

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
    released: released
      ? released.substring(
          0,
          releaseCountryIndex ? releaseCountryIndex - 1 : undefined
        )
      : "",
    country: {
      name: country ? country : "",
    },
    language: language ? language : "",
    runtime: runtime ? convertRuntime(runtime) : "",
    plot: plot ? plot : "",
    year: year ? year.substring(0, 4) : "",
  };
};

export const getImdbEpisodeDetail = async (
  imdbId: string,
  season: string,
  mainTitle: string
) => {
  const result = await fetch(
    `https://www.imdb.com/title/${imdbId}/episodes/?season=${season}`
  );
  const html = await result.text();
  const { document }: JsdomProps = new JSDOM(html).window;
  let counter = 0;
  const selector: ImdbSelector = await getImdbSelector("episode");
  // const tmdbDetail = await apiTmdb(
  //   `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`
  // ).then((res) => res.data);
  // const episodeDetail = await apiTmdb(
  //   `https://api.themoviedb.org/3/tv/${tmdbDetail.tv_results[0].id}/season/${season}?language=en-US`
  // ).then((res) => res.data.episodes);
  const seriesTitle = mainTitle;
  const episode: any = [];
  Array.from(document.querySelectorAll(selector.episodeArray), async (e) => {
    counter = counter + 1;
    const title = e.querySelector(selector.episodeTitle)?.textContent;
    const dotIndex = title?.indexOf("∙");
    const slug = createSlugEpisode(seriesTitle as string, season, counter);
    const released = e.querySelector(selector.released)?.textContent;
    const plot = e.querySelector(selector.plot)?.textContent;
    // const imdbRating = e
    //   .querySelector(".sc-577bf7cb-0 .sc-f1a948e3-1 .ipc-rating-star")
    //   ?.textContent?.substring(0, 3);
    // const poster = `https://www.themoviedb.org/t/p/w227_and_h127_bestv2${
    //   episodeDetail[counter - 1]?.still_path
    // }`;
    const poster = e.querySelector(selector.poster)?.getAttribute("src");

    episode.push({
      slug: slug,
      sequence: counter,
      released: released ? released : "",
      title: title ? title.substring(dotIndex ? dotIndex + 2 : 0) : "",
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

export const getImdbNewEpisodeDetail = async (
  imdbId: string,
  season: string,
  sequence: string,
  mainTitle: string
) => {
  const result = await fetch(
    `https://www.imdb.com/title/${imdbId}/episodes/?season=${season}`
  );
  const html = await result.text();
  const { document }: JsdomProps = new JSDOM(html).window;
  const selector: ImdbSelector = await getImdbSelector("episode");
  // const tmdbDetail = await apiTmdb(
  //   `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`
  // ).then((res) => res.data);
  // const episodeDetail = await apiTmdb(
  //   `https://api.themoviedb.org/3/tv/${tmdbDetail.tv_results[0].id}/season/${season}?language=en-US`
  // ).then((res) => res.data.episodes);

  const seriesTitle = mainTitle;
  const episodeList = document.querySelectorAll(selector.episodeArray);
  const title = episodeList[+sequence].querySelector(
    selector.episodeTitle
  )?.textContent;
  const dotIndex = title?.indexOf("∙");
  const slug = createSlugEpisode(seriesTitle as string, season, +sequence + 1);
  const released = episodeList[+sequence].querySelector(
    selector.released
  )?.textContent;
  const plot = episodeList[+sequence].querySelector(selector.plot)?.textContent;
  const poster = episodeList[+sequence]
    .querySelector(selector.poster)
    ?.getAttribute("src");
  // const poster = `https://www.themoviedb.org/t/p/w227_and_h127_bestv2${
  //   episodeDetail[+sequence]?.still_path
  // }`;

  return {
    slug: slug,
    sequence: +sequence + 1,
    released: released ? released : "",
    title: title ? title.substring(dotIndex ? dotIndex + 2 : 0) : "",
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

// export const convertPoster = async () => {
//   const movie = await prisma.movie.findMany({
//     where: {
//       type: "movie",
//     },
//   });
//   for await (let mov of movie) {
//     if (mov.imdbId.includes("tt")) {
//       const tmdbDetail = await apiTmdb(
//         `https://api.themoviedb.org/3/find/${mov.imdbId}?external_source=imdb_id`
//       ).then((res) => res.data);
//       if (tmdbDetail.movie_results[0]?.id) {
//         await prisma.movie.update({
//           where: {
//             id: mov.id,
//           },
//           data: {
//             poster: tmdbDetail.movie_results[0]?.poster_path
//               ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${tmdbDetail.movie_results[0]?.poster_path}`
//               : mov.poster,
//           },
//         });
//       }
//     }
//   }
//   const series = await prisma.movie.findMany({
//     where: {
//       type: {
//         in: ["series", "drama-korea"],
//       },
//     },
//     include: {
//       season: {
//         include: {
//           episode: true,
//         },
//       },
//     },
//   });

//   for await (let ser of series) {
//     if (ser.imdbId.includes("tt")) {
//       const tmdbDetail = await apiTmdb(
//         `https://api.themoviedb.org/3/find/${ser.imdbId}?external_source=imdb_id`
//       ).then((res) => res.data);
//       if (tmdbDetail.tv_results[0]?.id) {
//         await prisma.movie.update({
//           where: {
//             id: ser.id,
//           },
//           data: {
//             poster: tmdbDetail.tv_results[0]?.poster_path
//               ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${tmdbDetail.tv_results[0]?.poster_path}`
//               : ser.poster,
//           },
//         });

//         for await (let seas of ser.season) {
//           for await (let eps of seas.episode) {
//             const episodeDetail = await apiTmdb(
//               `https://api.themoviedb.org/3/tv/${tmdbDetail.tv_results[0]?.id}/season/${seas.sequence}?language=en-US`
//             )
//               .then((res) => res.data.episodes)
//               .catch(() => {
//                 return false;
//               });
//             if (episodeDetail) {
//               await prisma.episode.update({
//                 where: {
//                   id: eps.id,
//                 },
//                 data: {
//                   poster: episodeDetail[eps.sequence - 1]?.still_path
//                     ? `https://www.themoviedb.org/t/p/w227_and_h127_bestv2${
//                         episodeDetail[eps.sequence - 1]?.still_path
//                       }`
//                     : `https://image.tmdb.org/t/p/w600_and_h900_bestv2${tmdbDetail.tv_results[0]?.poster_path}`,
//                 },
//               });
//             }
//           }
//         }
//       }
//     }
//   }
// };
