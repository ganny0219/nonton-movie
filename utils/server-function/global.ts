import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  PreviewData,
} from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ParsedUrlQuery } from "querystring";

export const getPrismaJson = (prismaObjString: any) => {
  return JSON.parse(JSON.stringify(prismaObjString));
};

export const isMobileServerCheck = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const isServer = !!context.req;
  const userAgent: string | undefined = isServer
    ? context.req.headers["user-agent"]
    : navigator.userAgent;
  if (userAgent) {
    // const isLine = /\bLine\//i.test(userAgent) || false;
    const isMobile = /(iPad|iPhone|Android|Mobile)/i.test(userAgent) || false;
    // const rules = [
    //   "WebView",
    //   "(iPhone|iPod|iPad)(?!.*Safari/)",
    //   "Android.*(wv|.0.0.0)",
    // ];

    // const regex = new RegExp(`(${rules.join("|")})`, "ig");
    // const isInApp = Boolean(userAgent.match(regex));
    return isMobile;
  }
};

export const getPageIndexParams = (
  context:
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  return context.params?.index ? +context.params.index : undefined;
};

type KeyParams = "production" | "title" | "slug" | "category" | "id";

export const getStringParams = (
  context:
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | GetStaticPropsContext<ParsedUrlQuery, PreviewData>,
  key: KeyParams
) => {
  const json = JSON.parse(JSON.stringify(context.params));
  if (json[key]) {
    return json[key];
  }
  return "";
};

type MetaProps = {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image: string;
};
export const generateMetaResult = ({
  title,
  description,
  keywords,
  url,
  image,
}: MetaProps) => {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "video.movie",
      url,
      images: [image],
    },
  };
};

export async function sessionCheck() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect(process.env.NEXT_PUBLIC_BASE_URL + "/pandora/auth");
  }
}
