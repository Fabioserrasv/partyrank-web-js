import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      animeList: string;
      admin: boolean;
    } & DefaultSession
  }

  interface User{
    id:number;
    username: string;
    animeList: string;
    admin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id:number;
    username: string;
    animeList: string;
    admin: boolean;
  }
}