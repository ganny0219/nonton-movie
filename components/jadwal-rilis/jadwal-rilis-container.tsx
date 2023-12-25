import JadwalRilisSeasonCard from "@/components/jadwal-rilis/jadwal-rilis-season-card";
import MovieCard from "@/components/movie/movie-card";
import { ReleaseSchedule } from "@/types/release-schedule";
import React from "react";

type Props = {
  title: string;
  releseSchedule: ReleaseSchedule[];
};

function JadwalRilisContainer({ title, releseSchedule }: Props) {
  return (
    <>
      {releseSchedule.length > 0 && (
        <div>
          <div className="flex flex-row  items-center text-white py-4">
            <div className="w-[3px] h-[1em] bg-secondary mr-4" />
            <h2 className="text-2xl ">{title}</h2>
          </div>
          <div
            className={`grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4  grid-rows-1 gap-4 w-full`}
          >
            {releseSchedule.map((schedule, scheduleIndex) => {
              return schedule.movie.type == "movie" ? (
                <MovieCard
                  key={scheduleIndex}
                  data={schedule.movie}
                  index={scheduleIndex}
                />
              ) : (
                <JadwalRilisSeasonCard
                  mainPage
                  key={scheduleIndex}
                  data={schedule.movie.season[schedule.movie.season.length - 1]}
                  index={scheduleIndex}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default JadwalRilisContainer;
