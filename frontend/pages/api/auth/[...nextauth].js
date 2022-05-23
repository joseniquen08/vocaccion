import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    jwt: true,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile (profile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.email.split('@')[0],
          edad: null,
          email: profile.email,
          password: null,
          role: 'user',
          image: profile.picture,
          provider: true,
          emailVerified: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      profile (profile) {
        return {
          id: profile.id,
          name: profile.name,
          username: profile.email.split('@')[0],
          edad: null,
          email: profile.email,
          password: null,
          role: 'user',
          image: profile.picture.data.url,
          provider: true,
          emailVerified: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      },
    }),
  ],
  callbacks: {
    async session ({ session, token, user }) {
      session.user.role = user.role;
      return session;
    }
  },
  theme: {
    colorScheme: 'light',
  },
  secret: process.env.NEXTAUTH_SECRET,
});