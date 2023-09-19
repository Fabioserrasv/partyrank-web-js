import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      username: string;
      animeList: string;
      admin: boolean;
      theme?: "dark" | "light";
    } & DefaultSession
  }

  interface User{
    id:number;
    username: string;
    animeList: string;
    admin: boolean;
    theme?: "dark" | "light";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id:number;
    username: string;
    animeList: string;
    theme?: "dark" | "light";
    admin: boolean;
  }
}