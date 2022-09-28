import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../../../src/lib/mongodb';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      profile (profile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.email.split('@')[0],
          age: 0,
          email: profile.email,
          password: null,
          role: 'user',
          image: profile.picture,
          provider: 'google',
          emailVerifiedV: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
    }),
    FacebookProvider({
      clientId: `${process.env.FACEBOOK_CLIENT_ID}`,
      clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
      profile (profile) {
        return {
          id: profile.id,
          name: profile.name,
          username: profile.email.split('@')[0],
          age: 0,
          email: profile.email,
          password: null,
          role: 'user',
          image: profile.picture.data.url,
          provider: 'facebook',
          emailVerifiedV: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
    }),
  ],
  callbacks: {
    async session ({ session, token, user }) {
      session.user = {
        ...session.user,
        username: user.username,
        role:  user.role,
        provider: user.provider,
        age: user.age,
        id: user.id,
        emailVerifiedV: user.emailVerifiedV,
      };
      return session;
    },
  },
  theme: {
    colorScheme: 'light',
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
});