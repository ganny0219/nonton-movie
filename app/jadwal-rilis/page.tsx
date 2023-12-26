import JadwalRilisWarper from "@/components/jadwal-rilis/jadwal-rilis-warper";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { getReleaseSchedule } from "@/utils/server-function/release-schedule";
import React from "react";

async function JadwalRilisPage() {
  const releaseScheduleData = await getReleaseSchedule();
  return (
    <>
      {/* <CustomHead
        title="Jadawal Nonton Film, Movie, Jadwal Box Office Terbaru dan Terlengkap Subtitle Indonesia - Nonton Movie"
        description="Nonton Movie - Jadwal Nonton Film, Jadwal Serial TV, Jadwal Drakor, Jadwal Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus."
        keywords="Jadwal Nonton Film, Jadwal Nonton Gratis, Jadwal Nonton Streaming, Jadwal Nonton Movie, Jadwal Nonton Drama, Jadwal Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime"
      /> */}
      <RootComponent>
        <PageContainer title="JADWAL RILIS">
          <JadwalRilisWarper releaseScheduleData={releaseScheduleData} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default JadwalRilisPage;
