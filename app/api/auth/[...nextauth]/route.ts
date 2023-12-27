import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
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
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/pandora/auth",
  },
  callbacks: {
    session: async ({ session }) => Promise.resolve(session),
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
