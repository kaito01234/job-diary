import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import type { AuthOptions, SessionStrategy } from 'next-auth';
import type { Adapter, AdapterUser } from 'next-auth/adapters';
import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const prismaAdapter: Adapter = {
  ...PrismaAdapter(prisma),

  getUserByEmail: () => null,

  createUser: async (data) => {
    const user = await prisma.user.create({ data: { ...data, email: null } });
    return user as AdapterUser;
  },
};

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' as SessionStrategy },
  adapter: prismaAdapter,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/signup`;
    },
  },
};
