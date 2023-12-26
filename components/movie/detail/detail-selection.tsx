"use client";
import SelectButton from "@/components/button/select-button";
import Line from "@/components/line";
import { Movie } from "@/types/movie";
import React, { useEffect, useState } from "react";
import Season from "../season";
import CastContainer from "@/components/cast/cast-container";
import CastCard from "@/components/cast/cast-card";

type Props = {
  movie: Movie;
  movieType?: boolean;
};

function DetailSelection({ movie, movieType }: Props) {
  const [selected, setSelected] = useState<string>(
    movieType ? "Info" : "Episodes"
  );
  const selectedHandler = (key: string) => {
    setSelected(key);
  };

  useEffect(() => {
    setSelected(movieType ? "Info" : "Episodes");
  }, [movie]);

  const SelectedComponent = () => {
    if (selected === "Episodes") {
      return <Season season={movie.season} />;
    }
    if (selected === "Info") {
      return (
        <div>
          <h1 className="mb-4">Sypnosis</h1>
          <p>{movie.plot}</p>
        </div>
      );
    }
    if (selected === "Cast") {
      return (
        <>
          {movie.director.length != 0 && (
            <CastContainer title="Director">
              {movie.director.map((director, index) => {
                return <CastCard key={index} cast={director} />;
              })}
            </CastContainer>
          )}
          {movie.writer.length != 0 && (
            <CastContainer title="Writer">
              {movie.writer.map((writer, index) => {
                return <CastCard key={index} cast={writer} />;
              })}
            </CastContainer>
          )}
          {movie.actor.length != 0 && (
            <CastContainer title="Actor">
              {movie.actor.map((actor, index) => {
                return <CastCard key={index} cast={actor} />;
              })}
            </CastContainer>
          )}
        </>
      );
    }
    if (selected === "Trailer") {
      if (movie.trailerUrl) {
        return (
          <iframe
            className="w-full aspect-video"
            src={movie.trailerUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        );
      }
    }
  };
  return (
    <>
      <Line margin="4" />
      <div className="flex-wrap flex-row font-bold text-[#313131]">
        {!movieType && (
          <SelectButton
            selected={selected}
            selectedHandler={selectedHandler}
            title="Episodes"
          />
        )}
        <SelectButton
          selected={selected}
          selectedHandler={selectedHandler}
          title="Info"
        />
        <SelectButton
          selected={selected}
          selectedHandler={selectedHandler}
          title="Cast"
        />
        <SelectButton
          selected={selected}
          selectedHandler={selectedHandler}
          title="Trailer"
        />
      </div>
      <Line margin="4" />
      <SelectedComponent />
      <Line margin="4" />
    </>
  );
}

export default DetailSelection;
