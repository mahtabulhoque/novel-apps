import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connect } from "@/lib/db";
import { signJwtToken } from "@/lib/jwt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},

      async authorize(credentials) {
        console.log("Received credentials:", credentials); // Debugging input
        await connect();

        const { email, password } = credentials;

        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("Invalid email or password");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error("Invalid email or password");
          }

          const { password: _, __v, ...safeUser } = user._doc;
          const accessToken = signJwtToken(safeUser, { expiresIn: "7d" });

          console.log("Authorized User:", safeUser);
          return { ...safeUser, accessToken };
        } catch (error) {
          console.error("Authorization error:", error.message);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
