import { Movie } from "@/types/movie";

export const convertSlugToTitle = (slug: string) => {
  const allWord = slug.split("-");
  let title = "";
  for (let word of allWord) {
    title = title + " " + word.charAt(1);
  }

  var splitStr = slug.toLowerCase().split("-");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  const result = splitStr.join(" ");

  return result;
};

export const histats = () => {
  (function () {
    var hs = document.createElement("script");
    hs.type = "text/javascript";
    hs.async = true;
    hs.src = "//s10.histats.com/js15_as.js";
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(hs);
  })();
};

export const gAnalytic = () => {
  (function () {
    var ga = document.createElement("script");
    ga.type = "text/javascript";
    ga.async = true;
    ga.src = "https://www.googletagmanager.com/gtag/js?id=G-TJNG0J9X6K";
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(ga);
  })();
};

export const isMobileCheck = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

export const convertDate = (date: string) => {
  if (date == "") {
    return "";
  }
  const months = [
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
  const parts = date.split(" ");
  const month = months.indexOf(parts[0]);
  const day = parseInt(parts[1].replace(",", ""));
  const year = parseInt(parts[2]);

  return new Date(year, month, day + 1).toISOString();
};

export const convertEpisodeDateTimestamp = (date: string) => {
  if (date == "") {
    return "";
  }
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

  const parts = date.split(" ");
  const day = parseInt(parts[2].replace(",", ""));
  const month = months.indexOf(parts[1]);
  const year = parseInt(parts[3]);

  return new Date(year, month, day + 1).toISOString();
};

export const sortFeatured = (movie: Movie[]) => {
  const resultSort = movie.sort((a, b) => {
    let aDate;
    let bDate;
    if (a.type == "series") {
      aDate = convertEpisodeDateTimestamp(
        a.season[a.season.length].episode[
          a.season[a.season.length].episode.length
        ].released
      );
    } else {
      aDate = a.releasedTimestamp;
    }

    if (b.type == "series") {
      bDate = convertEpisodeDateTimestamp(
        b.season[b.season.length].episode[
          b.season[b.season.length].episode.length
        ].released
      );
    } else {
      bDate = b.releasedTimestamp;
    }
    //@ts-ignore
    if (aDate > bDate) {
      return 1;
    } else {
      return 0;
    }
  });
  return resultSort;
};

export const convertRating = (rating: string) => {
  const stringRating = (+rating).toFixed(1).toString();
  const dotIndex = stringRating.indexOf(".");
  if (stringRating.substring(dotIndex + 1, dotIndex + 2) == "0") {
    return stringRating.substring(0, dotIndex);
  }
  return stringRating;
};

export const convertSitemapSlug = (slug: string) => {
  const regexPattern = /\/sitemap-(\w+)-(\d+)\.xml/;
  const matches = slug.match(regexPattern);
  //@ts-ignore
  const type = matches[1];
  //@ts-ignore
  const page = parseInt(matches[2], 10);
  return { type, page };
};

export const createSlugEpisode = (
  title: string,
  season: string,
  sequence: number
) => {
  return (
    title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replaceAll(" ", "-") +
    "-" +
    "season-" +
    season +
    "-episode-" +
    sequence
  );
};
