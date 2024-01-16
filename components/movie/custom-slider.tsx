"use client";
import { Movie, Season } from "@/types/movie";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import MovieCard from "./movie-card";
import Slider from "react-slick";
import SliderCard from "./slider-card";
import LeftCircle from "@/assets/icons/left-circle";
import RightCircle from "@/assets/icons/right-circle";
import SeasonCard from "./season-card";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  title: string;
  movieList?: Movie[];
  seasonList?: Season[];
  urlSeeAll?: string;
};

const responsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: false,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
    },
  },
  {
    breakpoint: 640,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
    },
  },
];

function CustomSlider({ title, movieList, seasonList, urlSeeAll }: Props) {
  const sliderRef = useRef<Slider | null>(null);
  const slideNumberRef = useRef(0);
  const currentSlideRef = useRef(0);
  const pathName = usePathname();

  useEffect(() => {
    sliderRef.current?.slickGoTo(0);
  }, [pathName]);

  useEffect(() => {
    let dataLength = 0;
    if (movieList) {
      dataLength = movieList.length;
    } else if (seasonList) {
      dataLength = seasonList.length;
    }
    //@ts-ignore
    if (sliderRef.current?.state.breakpoint == 768) {
      slideNumberRef.current = dataLength - 3;
      //@ts-ignore
    } else if (sliderRef.current?.state.breakpoint == 1024) {
      slideNumberRef.current = dataLength - 4;
    } else {
      slideNumberRef.current = dataLength - 6;
    }
  }, [sliderRef]);

  const afterChangeHandler = (curSlide: number) => {
    currentSlideRef.current = curSlide;
  };

  return (
    <div className="flex flex-col border-b-[1px] border-[#363636] border-solid py-4">
      <div className="flex flex-row  items-center text-white py-4 ">
        <div className="w-[3px] truncate h-[1em] bg-secondary mr-2 md:mr-4" />
        <h2 className="flex-1 truncate md:text-2xl">{title}</h2>
        {urlSeeAll && (
          <a
            href={urlSeeAll}
            className="bg-secondary px-2 py-1 text-[0.5rem] md:text-xs font-bold rounded text-[#313131]"
          >
            SEE ALL
          </a>
        )}
        <div className="flex items-center ml-2">
          <button
            aria-label="prev-button"
            className="mr-1"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <LeftCircle size="1.5" />
          </button>
          <button
            aria-label="next-button"
            onClick={() => {
              // if (slideNumber == currentSlide) {
              if (slideNumberRef.current == currentSlideRef.current) {
                return sliderRef.current?.slickGoTo(0);
              }
              sliderRef.current?.slickNext();
            }}
          >
            <RightCircle size="1.5" />
          </button>
        </div>
      </div>
      {seasonList ? (
        <Slider
          ref={sliderRef}
          infinite={false}
          responsive={responsive}
          rows={1}
          slidesToShow={6}
          slidesToScroll={1}
          arrows={false}
          afterChange={afterChangeHandler}
        >
          {seasonList.map((season, index) => {
            return <SeasonCard key={index} data={season} index={index} />;
          })}
        </Slider>
      ) : (
        <Slider
          ref={sliderRef}
          infinite={false}
          responsive={responsive}
          rows={1}
          slidesToShow={6}
          slidesToScroll={1}
          arrows={false}
          afterChange={afterChangeHandler}
        >
          {movieList?.map((movie, index) => {
            return <SliderCard key={index} data={movie} index={index} />;
          })}
        </Slider>
      )}
    </div>
  );
}

export default CustomSlider;
