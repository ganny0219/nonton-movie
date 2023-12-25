import FilledStarIcon from "@/assets/icons/filled-star-icon";
import ProfileIcon from "@/assets/icons/profile-icon";
import StarIcon from "@/assets/icons/star-icon";
import { RootState } from "@/store";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Props = {
  rating: number;
  vote: string[];
  totalRating: number;
  movieId: string | undefined;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  isMobile?: boolean;
};

function StarRating({
  rating,
  vote,
  movieId,
  totalRating,
  setRating,
  isMobile,
}: Props) {
  const [hover, setHover] = useState(Math.floor(+rating));
  const [choose, setChoose] = useState(0);
  const [addVote, setAddVote] = useState(vote.length);
  const [disabled, setDisabled] = useState(false);
  const numStar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const hoverHandler = (e: React.MouseEvent, sequence: number) => {
    e.preventDefault();
    setHover(sequence);
  };
  const onChooseHandler = async (star: number) => {
    let newRating = 0;
    if (vote.length == 0) {
      newRating = star;
    } else {
      newRating = (+totalRating + star) / (vote.length + 1);
    }
    await apiAxios.post(`/rating/vote-movie`, {
      star: star,
      lastTotalRating: totalRating,
      lastVote: vote,
      movieId: movieId,
    });
    setRating(newRating);
    setChoose(star);
    setAddVote((prevVote) => prevVote + 1);
    setDisabled(true);
  };

  return (
    <>
      <div
        className="flex flex-col justify-center mr-2"
        onMouseLeave={() =>
          setHover(choose != 0 ? choose : Math.floor(+rating))
        }
      >
        <div className="flex flex-row w-full flex-wrap">
          {numStar.map((star, starIndex) => {
            return (
              <div
                key={starIndex}
                className={`mr-2 hover:cursor-pointer ${
                  isMobile ? "w-[5%]" : ""
                }`}
                onMouseEnter={(e) => {
                  if (!disabled) {
                    hoverHandler(e, star);
                  }
                }}
                onClick={() => {
                  if (!disabled) {
                    onChooseHandler(star);
                  }
                }}
              >
                {hover + 1 > star ? (
                  <FilledStarIcon size="1.2" />
                ) : (
                  <StarIcon size="1.2" />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-row items-center mt-2">
          <ProfileIcon size="1.2" />
          <span className="ml-2 text-sm">{addVote}</span>
          {isMobile && (
            <div className="flex flex-1 justify-end pr-2">
              <div
                className={`text-sm bg-[#313131] px-4 whitespace-nowrap rounded`}
              >
                Your rating : {choose}
              </div>
            </div>
          )}
        </div>
      </div>
      {!isMobile && (
        <div>
          <div className={` bg-[#313131] px-4 whitespace-nowrap rounded`}>
            Your rating : {choose}
          </div>
        </div>
      )}
    </>
  );
}

export default StarRating;
