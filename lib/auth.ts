import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import { getUser } from "./auth.actions";

export const authOptions = {
  providers: [
    CredentialsProvider({
        name: 'Sign in ',
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const user = await getUser(credentials);
    
          if (user) {
            return user
          }
          return null
        }
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!
      })
  ],
};
