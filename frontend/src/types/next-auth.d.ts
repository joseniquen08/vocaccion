import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string | unknown;
      role:  string | unknown;
      provider: string | unknown;
      age: number | unknown;
      id: string | unknown;
      emailVerifiedV: boolean | unknown;
    } & DefaultSession["user"];
  }
}
