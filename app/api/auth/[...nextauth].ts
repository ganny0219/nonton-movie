import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "N0nt0nm0v!e"
        ) {
          return { id: "1", username: credentials.username };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async (session) => {
      return Promise.resolve(session);
    },
  },
});
