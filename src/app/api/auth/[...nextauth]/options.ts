import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { encode, decode } from 'next-auth/jwt';
import { UserService } from '@/services/user.service';

export const options: NextAuthOptions = {
  pages: {
    signIn: '/login',
    error: '/error'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text"
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

          if (user?.scores) {
            let sum = user.scores.map(score => score.value)
            average = Number((sum.reduce((a, b) => a + b, 0) / sum.length).toFixed(2))
          }

          if (user != null) {
            return {
              id: user.id,
              username: user.username,
              animeList: user.animeList,
              admin: user.admin || false,
              imageUrl: user.imageUrl,
              average: average,
              theme: "light"
            } 
          }

          return null
        } catch (error) {
          throw error;
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
        token.theme = "dark"
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
        session.user.theme = "dark"
        session.user.average = token.average
        session.user.imageUrl = token.imageUrl
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + '/home'
    }
  },
  session: {
    strategy: "jwt"
  },
  jwt: { encode, decode }
};