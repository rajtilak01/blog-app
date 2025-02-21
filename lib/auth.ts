import CredentialsProvider from "next-auth/providers/credentials"
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
    })
  ],
};
