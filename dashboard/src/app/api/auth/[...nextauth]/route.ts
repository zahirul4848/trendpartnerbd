import axios from "axios";
import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


interface CredentialsProvider {
  email: string,
  password: string,
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const {email, password} = credentials as CredentialsProvider;
        try {         
          const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/login`, {email, password});
          console.log(data.token);
          return data;
        } catch (error) {
          console.log("Error", error);
        }
      }
    })
  ],
  callbacks: {
    jwt({token, user}:any) {
      if(user) {
        token.role = user.role;
        token.token = user.token;
      };
      return token;
    },
    session({session, token}) {
      session.user.role = token.role;
      session.user.token = token.token;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};