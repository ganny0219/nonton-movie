export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/pandora/eds/:path*",
    "/pandora/anime/:path*",
    "/pandora/config/:path*",
    "/pandora/drama-korea/:path*",
    "/pandora/featured/:path*",
    "/pandora/google-drive/:path*",
    "/pandora/movie/:path*",
    "/pandora/schedule/:path*",
    "/pandora/series/:path*",
    "/pandora/social-media/:path*",
  ],
};
