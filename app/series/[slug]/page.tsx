import PageContainer from "@/components/layouts/page-container";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { Movie } from "@/types/movie";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";
import { convertSlugToTitle } from "@/utils/client-function/global";
import {
  getMovieBySlug,
  getRecomendarionMovie,
} from "@/utils/server-function/movie";
import DetailSelection from "@/components/movie/detail/detail-selection";
import { generateMetaResult } from "@/utils/server-function/global";
import { Metadata } from "next";
import { PageProps } from "@/types/global";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = await params.slug;
  const series: Movie = await getMovieBySlug(slug);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/series/${slug}`;
  const title = `Nonton ${series.title} - Subtitle Indonesia - Moovie21`;
  const description = `Moovie21 - Nonton Film ${series.title} sub indo dengan kualitas tinggi yang tersedia disitus, dalam subtitle bahasa indonesia. `;
  const keywords = `Nonton ${series.title}, Nonton Film ${series.title}, Nonton ${series.title} Gratis, Nonton ${series.title} Streaming, ${series.title} Subtitle Indonesia`;
  const image = series.poster;
  return generateMetaResult({ title, description, keywords, url, image });
}

async function StreamSeriesPage(props: PageProps) {
  const slug = await props.params.slug;
  const series: Movie = await getMovieBySlug(slug);
  const recomendMovie = await getRecomendarionMovie(series ? series.genre : []);

  return (
    <>
      <RootComponent>
        <PageContainer>
          <AdsContainerTwoGrid />
          <DetailMovie data={series} />
          <DetailSelection movie={series} />
          <RecomendationMovie recomendMovie={recomendMovie} />
          <Note title={convertSlugToTitle(series.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default StreamSeriesPage;
