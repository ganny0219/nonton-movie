import JadwalRilisWarper from "@/components/jadwal-rilis/jadwal-rilis-warper";
import PageContainer from "@/components/layouts/page-container";
import RootComponent from "@/components/root-component";
import { PageProps } from "@/types/global";
import { generateMetaResult } from "@/utils/server-function/global";
import { getReleaseSchedule } from "@/utils/server-function/release-schedule";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const url = `/jadwal-rilis`;
  const title =
    "Jadawal Nonton Film, Movie, Jadwal Box Office Terbaru dan Terlengkap Subtitle Indonesia - Moovie21";
  const description =
    "Moovie21 - Jadwal Nonton Film, Jadwal Serial TV, Jadwal Drakor, Jadwal Anime terbaru dengan kualitas tinggi yang tersedia dalam subtitle Indonesia dan diupdate setiap hari. Film Box Office hingga Serial TV Terbaik semua tersedia disitus.";
  const keywords =
    "Jadwal Nonton Film, Jadwal Nonton Gratis, Jadwal Nonton Streaming, Jadwal Moovie21, Jadwal Nonton Drama, Jadwal Nonton Anime, Subtitle Indonesia, Streaming Drakor, Streaming Anime";
  const image = `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`;
  return generateMetaResult({
    title,
    description,
    keywords,
    url,
    image,
    // searchParams,
  });
}

async function JadwalRilisPage(props: PageProps) {
  const searchParamsCount = Object.keys(props.searchParams).length;

  if (searchParamsCount > 0) {
    return redirect(process.env.NEXT_PUBLIC_BASE_URL + "/not-found");
  }
  const releaseScheduleData = await getReleaseSchedule();
  return (
    <>
      <RootComponent>
        <PageContainer title="JADWAL RILIS">
          <JadwalRilisWarper releaseScheduleData={releaseScheduleData} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default JadwalRilisPage;
