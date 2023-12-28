import Link from "next/link";
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
            <h2 className="mb-4">MOOVIE21</h2>
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
          <h2>Original Series</h2>
          <div className="flex flex-col justify-start items-start text-red-500 my-1 text-sm">
            <Link href={{ pathname: `/` }} className="my-1">
              Apple TV +
            </Link>
            <Link href={{ pathname: `/official/Amazon` }} className="my-1">
              Amazon
            </Link>
            <Link href={{ pathname: `/official/Disney` }} className="my-1">
              Disney+
            </Link>
            <Link href={{ pathname: `/official/Hbo` }} className="my-1">
              HBO
            </Link>
            <Link href={{ pathname: `/official/Netflix` }} className="my-1">
              Netflix
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-[25%] m-2">
          <h2>Categoty</h2>
          <div className="flex flex-col justify-start items-start text-red-500 my-1 text-sm">
            <Link href={{ pathname: `/genre/Action` }} className="my-1">
              Action
            </Link>
            <Link href={{ pathname: `/genre/Adventure` }} className="my-1">
              Adventure
            </Link>
            <Link href={{ pathname: `/anime` }} className="my-1">
              Anime
            </Link>
            <Link href={{ pathname: `/genre/Comedy` }} className="my-1">
              Comedy
            </Link>
            <Link href={{ pathname: `/genre/Drama` }} className="my-1">
              Drama
            </Link>
            <Link href={{ pathname: `/genre/Horror` }} className="my-1">
              Horror
            </Link>
            <Link href={{ pathname: `/genre/Sci-Fi` }} className="my-1">
              Sci-Fi
            </Link>
          </div>
        </div>
        <div className="flex justify-start items-start flex-col w-[25%] m-2">
          <h2>MOOVIE21</h2>
          <div className="flex flex-col justify-start items-start text-red-500 my-1 text-sm">
            <Link href={{ pathname: `/` }} className="my-1">
              DCEU Movie
            </Link>
            <Link href={{ pathname: `/` }} className="my-1">
              MCU Movie
            </Link>
            <Link href={{ pathname: `/` }} className="my-1 text-start">
              Disney+ Movie and Series
            </Link>
            <Link href={{ pathname: `/` }} className="my-1 text-start">
              Netflix Movie and Series
            </Link>
            <Link href={{ pathname: `/` }} className="my-1 text-start">
              Marvel Studio Series
            </Link>
            <Link href={{ pathname: `/` }} className="my-1">
              Coming Soon
            </Link>
            <Link href={{ pathname: `/` }} className="my-1">
              LK21
            </Link>
            <Link href={{ pathname: `/` }} className="my-1">
              Rebahin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
