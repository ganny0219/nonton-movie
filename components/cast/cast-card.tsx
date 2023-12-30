import React from "react";
import Line from "../line";
import Image from "next/image";
import { Actor, Director, Writer } from "@/types/movie";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type Props = {
  cast: Director | Writer | Actor;
};

function CastCard({ cast }: Props) {
  return (
    <div className="flex flex-col my-2">
      <div className="flex flex-row mb-2 text-lg">
        <Image
          loading="lazy"
          title={cast.name + " as " + cast.as}
          height={200}
          width={200}
          quality={20}
          alt={`${cast.name} Sebagai ${cast.as}`}
          src={cast.imageUrl ? cast.imageUrl : "/img/no-profile-img.jpg"}
          className="w-[30%] aspect-square object-contain"
        />
        <div className="flex flex-col ml-2 truncate">
          <Link
            href={{ pathname: `/cast/${cast.name}` }}
            className="hover:text-secondary text-xs sm:text-base truncate"
          >
            {cast?.name}
          </Link>
          <p className="text-xs sm:text-base truncate">{cast?.as}</p>
        </div>
      </div>
      {/* <line className="w-full border-[1px] border-solid border-[#313131]" /> */}
      <Line thin />
    </div>
  );
}

export default CastCard;
