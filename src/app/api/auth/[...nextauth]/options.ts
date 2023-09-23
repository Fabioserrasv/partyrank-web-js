import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserService } from '../../../../services/user.service';
import { encode, decode } from 'next-auth/jwt';
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from '../../../../lib/prisma';

export const options: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Digite seu nome de usuario"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        try {
          const userService = new UserService;
          const user = await userService.login({
            username: credentials?.username as string,
            password: credentials?.password as string
          })

          let average = 0
          
          if (user?.scores){
            let sum = user.scores.map(score => score.value)
            average = (sum.reduce((a, b) => a + b, 0) / sum.length)
          }

          if (user != null) {
            return {
              id: user.id,
              username: user.username,
              animeList: user.animeList,
              admin: user.admin,
              imageUrl: user.imageUrl,
              average: average, 
              theme: "light"
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
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update") return { ...token, ...session.user }
      
      if (user) {
        token.id = user.id as number
        token.username = user.username
        token.animeList = user.animeList
        token.admin = user.admin;
        token.theme = user.theme
        token.average = user.average
        token.imageUrl = user.imageUrl
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.admin = token.admin
        session.user.username = token.username
        session.user.animeList = token.animeList
        session.user.id = token.id
        session.user.theme = token.theme
        session.user.average = token.average
        session.user.imageUrl = token.imageUrl
      }
      return session;
    },
  },
  session: {
    strategy: "jwt"
  },
  jwt: { encode, decode }
};