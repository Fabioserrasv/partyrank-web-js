import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserService } from '../../user/user.service';
import { encode, decode } from 'next-auth/jwt';
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from '../../../lib/prisma';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Digite seu nome de usuario"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const userService = new UserService;
          const user = await userService.login({
            username: credentials?.username as string,
            password: credentials?.password as string
          })
          
          if (user != null) {
            return {
              id: user.id,
              username: user.username,
              animeList: user.animeList,
              admin: user.admin,
            }
          }

          return null
        } catch (error) {
          console.log(error)
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.id = user.id as number
        token.username = user.username
        token.animeList = user.animeList
        token.admin = user.admin;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.admin = token.admin
        session.user.username = token.username
        session.user.animeList = token.animeList
        session.user.id = token.id
      }
      return session;
    },
  },
  session: {
    strategy: "jwt"
  },
  jwt: { encode, decode }
};