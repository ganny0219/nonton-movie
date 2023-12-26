"use client";
import React, { useEffect, useRef } from "react";
import { Movie } from "@/types/movie";
import SliderCard from "./slider-card";
import Slider from "react-slick";
import RightCircle from "@/assets/icons/right-circle";
import LeftCircle from "@/assets/icons/left-circle";
import { useRouter } from "next/navigation";

type Props = {
  recomendMovie: Movie[];
};

const responsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
    },
  },
];
function RecomendationMovie({ recomendMovie }: Props) {
  const sliderRef = useRef<Slider | null>(null);
  const slideNumberRef = useRef(0);
  const currentSlideRef = useRef(0);
  const pathName = useRouter();
  useEffect(() => {
    sliderRef.current?.slickGoTo(0);
  }, [pathName]);
  useEffect(() => {
    //@ts-ignore
    if (sliderRef.current?.state.breakpoint == 768) {
      slideNumberRef.current = recomendMovie.length - 3;
      //@ts-ignore
    } else if (sliderRef.current?.state.breakpoint == 1024) {
      slideNumberRef.current = recomendMovie.length - 4;
    } else {
      slideNumberRef.current = recomendMovie.length - 6;
    }
  }, [sliderRef]);

  const afterChangeHandler = (curSlide: number) => {
    currentSlideRef.current = curSlide;
  };

  return (
    <>
      {recomendMovie && recomendMovie.length > 0 && (
        <div className="flex flex-col border-b-[1px] border-[#363636] border-solid py-4 mb-6">
          <div className="flex flex-row  items-center text-white py-4 text-2xl">
            <div className="w-[3px] h-[1em] truncate bg-secondary mr-2 md:mr-4" />
            <h3 className="flex-1 truncate md:text-2xl">Recomendation Movie</h3>
            <div className="flex items-center ml-2">
              <button
                className="mr-1"
                onClick={() => sliderRef.current?.slickPrev()}
              >
                <LeftCircle size="1.5" />
              </button>
              <button
                onClick={() => {
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
            {recomendMovie?.map((movie, index) => {
              return <SliderCard key={index} data={movie} index={index} />;
            })}
          </Slider>
        </div>
      )}
    </>
  );
}

export default RecomendationMovie;
