import axios from "axios";
import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from 'next-auth/providers/google';
import { FacebookProfile } from 'next-auth/providers/facebook';
import FacebookProvider from "next-auth/providers/facebook";



interface CredentialsProvider {
  email: string,
  password: string,
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      async profile(profile: GoogleProfile) {
        try {         
          const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/social-auth`, {email: profile.email, name: profile.name});
          return {
            ...data,
            id: data._id,
          };
        } catch (error) {
          console.log("Error", error);
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      async profile(profile: FacebookProfile) {
        try {         
          const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/social-auth`, {email: profile.email, name: profile.name});
          return {
            ...data,
            id: data._id,
          };
        } catch (error) {
          console.log("Error", error);
        }
      },
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const {email, password} = credentials as CredentialsProvider;
        try {         
          const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/user/login`, {email, password});
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
        token._id = user._id;
      };
      return token;
    },
    session({session, token}) {
      session.user.role = token.role;
      session.user.token = token.token;
      session.user._id = token._id;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/account/login",
  },
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};