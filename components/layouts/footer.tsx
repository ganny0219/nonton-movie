import a from "next/link";
import React from "react";

type Props = {
  hidden?: boolean;
};

async function Footer({ hidden }: Props) {
  return (
    <div className="hidden md:flex w-full border-solid border-[#363636] border-y-[1px] mt-4">
      <div className=" border-solid border-[#363636] flex flex-row mt-auto text-white w-[95%] m-auto py-10">
        <div className="flex flex-col w-full m-2">
          <div className="w-[50%]">
            <h3 className="mb-4">MOOVIE21</h3>
            <p>
              Moovie21 merupakan situs penyedia layanan streaming film dan
              serial tv gratis. Sama seperti penyedia film dan serial tv lainnya
              seperti Netflix, Disney+, HBO, Apple TV+, Amazon Prime Video, dan
              lainnya. Moovie21 berusaha untuk menyediakan layanan streaming
              gratis untuk selamanya kepada para rakyat Indonesia yang belum
              mampu berlangganan layanan premium streaming seperti yang disebut
              diatas. Perlu diperhatikan Moovie21 tidak menyediakan film maupun
              serial tv dari negara Indonesia.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-[25%] m-2">
          <h3>Original Series</h3>
          <div className="flex flex-col justify-start items-start text-red-500 my-1 text-sm">
            <a href={`/`} className="my-1">
              Apple TV +
            </a>
            <a href={`/official/Amazon`} className="my-1">
              Amazon
            </a>
            <a href={`/official/Disney`} className="my-1">
              Disney+
            </a>
            <a href={`/official/Hbo`} className="my-1">
              HBO
            </a>
            <a href={`/official/Netflix`} className="my-1">
              Netflix
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-[25%] m-2">
          <h3>Categoty</h3>
          <div className="flex flex-col justify-start items-start text-red-500 my-1 text-sm">
            <a href={`/genre/Action`} className="my-1">
              Action
            </a>
            <a href={`/genre/Adventure`} className="my-1">
              Adventure
            </a>
            <a href={`/anime`} className="my-1">
              Anime
            </a>
            <a href={`/genre/Comedy`} className="my-1">
              Comedy
            </a>
            <a href={`/genre/Drama`} className="my-1">
              Drama
            </a>
            <a href={`/genre/Horror`} className="my-1">
              Horror
            </a>
            <a href={`/genre/Sci-Fi`} className="my-1">
              Sci-Fi
            </a>
          </div>
        </div>
        <div className="flex justify-start items-start flex-col w-[25%] m-2">
          <h3>MOOVIE21</h3>
          <div className="flex flex-col justify-start items-start text-red-500 my-1 text-sm">
            <a href={`/`} className="my-1">
              DCEU Movie
            </a>
            <a href={`/`} className="my-1">
              MCU Movie
            </a>
            <a href={`/`} className="my-1 text-start">
              Disney+ Movie and Series
            </a>
            <a href={`/`} className="my-1 text-start">
              Netflix Movie and Series
            </a>
            <a href={`/`} className="my-1 text-start">
              Marvel Studio Series
            </a>
            <a href={`/`} className="my-1">
              Coming Soon
            </a>
            <a href={`/`} className="my-1">
              LK21
            </a>
            <a href={`/`} className="my-1">
              Rebahin
            </a>
            <a href={`/`} className="my-1">
              Indoxxi
            </a>
            <a href={`/`} className="my-1">
              Idlix
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
