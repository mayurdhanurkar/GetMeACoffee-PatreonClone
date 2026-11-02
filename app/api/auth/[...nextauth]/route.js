import NextAuth from "next-auth";
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/user";
import Payment from "@/models/payments";
import connectDB from "@/DB/connectdb";

export const authOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github" || account.provider === "google") {
        const client = await mongoose.connect("mongodb://localhost:27017/coffee");
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            username: user.email.split("@")[0],
          });
          await newUser.save();
        }

        return true;
      }
    },
    async session({ session }) {
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
