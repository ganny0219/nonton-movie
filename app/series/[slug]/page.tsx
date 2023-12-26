import PageContainer from "@/components/layouts/page-container";
import DetailMovie from "@/components/movie/detail/detail-movie";
import RecomendationMovie from "@/components/movie/recomendation-movie";
import Note from "@/components/note";
import RootComponent from "@/components/root-component";
import { Movie } from "@/types/movie";
import AdsContainerTwoGrid from "@/components/ads/ads-container-two-grid";
import { convertSlugToTitle } from "@/utils/client-function/global";
import CustomHead from "@/components/custom-head";
import {
  getMovieBySlug,
  getRecomendarionMovie,
} from "@/utils/server-function/movie";
import { PageProps } from "@/.next/types/app/page";
import DetailSelection from "@/components/movie/detail/detail-selection";

async function StreamSeriesPage(props: PageProps) {
  const slug = props.params.slug;
  const series: Movie = await getMovieBySlug(slug);
  const recomendMovie = await getRecomendarionMovie(series ? series.genre : []);

  return (
    <>
      {/* <CustomHead
        title={`Nonton ${series.title} - Subtitle Indonesia - Nonton Movie`}
        description={`Nonton Movie - Nonton Film ${series.title} sub indonesia sub indonesia dengan kualitas tinggi yang tersedia disitus, dalam bahasa indonesia. `}
        keywords={`Nonton ${series.title}, Nonton Film ${series.title}, Nonton ${series.title} Gratis, Nonton ${series.title} Streaming, ${series.title} Subtitle Indonesia`}
      /> */}
      <RootComponent>
        <PageContainer>
          <AdsContainerTwoGrid />
          <DetailMovie data={series} />
          <DetailSelection series={series} />
          <RecomendationMovie recomendMovie={recomendMovie} />
          <Note title={convertSlugToTitle(series.slug)} />
        </PageContainer>
      </RootComponent>
    </>
  );
}

export default StreamSeriesPage;
