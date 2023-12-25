import CustomHead from "@/components/custom-head";
import JadwalRilisContainer from "@/components/jadwal-rilis/jadwal-rilis-container";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { ReleaseScheduleData } from "@/types/release-schedule";
import { isMobileServerCheck } from "@/utils/server-function/global";
import { getReleaseSchedule } from "@/utils/server-function/release-schedule";
import { GetServerSideProps, GetStaticProps } from "next";
import React, { useEffect, useState } from "react";

type Props = {
  releaseScheduleData: ReleaseScheduleData;
};

function JadwalRilisPage({ releaseScheduleData }: Props) {
  const [selectedType, setSelectedType] = useState("Series");
  const [releseSchedule, setReleseSchedule] = useState(releaseScheduleData);

  useEffect(() => {
    releseScheduleDataHandler("Series");
  }, []);

  const onSelectedChange = (value: string) => {
    releseScheduleDataHandler(value);
    setSelectedType(value);
  };

  const releseScheduleDataHandler = (value: string) => {
    const keysSchedule = Object.keys(releaseScheduleData);
    const val = value == "Drakor" ? "drama-korea" : value;
    let result: ReleaseScheduleData = {
      monday: [],
      thursday: [],
      wednesday: [],
      tuesday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    for (let key of keysSchedule) {
      for (let data of releaseScheduleData[key]) {
        result = {
          ...result,
          [key]:
            data.movie.type != val.toLowerCase()
              ? [...result[key]]
              : [...result[key], data],
        };
      }
    }
    setReleseSchedule(result);
  };
  return (
    <>
      <CustomHead
        title="Jadawal Nonton Film, Movie, Jadwal Box Office Terbaru dan Terlengkap Subtitle Indonesia - Nonton Movie"
        description="Nonton Movie - Jadwal Nonton Film, Jadwal Serial TV, Jadwal Drakor, Jadwal Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus."
        keywords="Jadwal Nonton Film, Jadwal Nonton Gratis, Jadwal Nonton Streaming, Jadwal Nonton Movie, Jadwal Nonton Drama, Jadwal Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime"
      />
      <RootComponent>
        <PageContainer title="JADWAL RILIS">
          <div className="flex flex-col w-full">
            <div className="flex flex-row w-full justify-evenly mt-6">
              <button
                className={`text-xl  border-secondary ${
                  selectedType == "Series" && "text-secondary border-b-2"
                }`}
                onClick={() => onSelectedChange("Series")}
              >
                Series
              </button>
              <button
                className={`text-xl  border-secondary ${
                  selectedType == "Anime" && "text-secondary border-b-2"
                }`}
                onClick={() => onSelectedChange("Anime")}
              >
                Anime
              </button>
              <button
                className={`text-xl  border-secondary ${
                  selectedType == "Drakor" && "text-secondary border-b-2"
                }`}
                onClick={() => onSelectedChange("Drakor")}
              >
                Drakor
              </button>
            </div>
            <JadwalRilisContainer
              title="Senin"
              releseSchedule={releseSchedule.monday}
            />
            <JadwalRilisContainer
              title="Selasa"
              releseSchedule={releseSchedule.tuesday}
            />
            <JadwalRilisContainer
              title="Rabu"
              releseSchedule={releseSchedule.wednesday}
            />
            <JadwalRilisContainer
              title="Kamis"
              releseSchedule={releseSchedule.thursday}
            />
            <JadwalRilisContainer
              title="Jumat"
              releseSchedule={releseSchedule.friday}
            />
            <JadwalRilisContainer
              title="Sabtu"
              releseSchedule={releseSchedule.saturday}
            />
            <JadwalRilisContainer
              title="Minggu"
              releseSchedule={releseSchedule.sunday}
            />
          </div>
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default JadwalRilisPage;

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const releaseScheduleData = await getReleaseSchedule();
    return {
      props: {
        releaseScheduleData,
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: {},
      redirect: {
        permanent: true,
        destination: "/error",
      },
    };
  }
};
