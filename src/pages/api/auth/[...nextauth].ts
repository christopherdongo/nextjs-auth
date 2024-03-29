import NextAuth, {Account, Profile, User} from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import {AdapterUser} from "next-auth/adapters";
import {JWT} from "next-auth/jwt";
import connectDb from "@/utils/connectDb";
import {default as Userr} from "@/models/User";
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name:'Credentials',
      credentials:{
        email:{
          label:'Name',
          type:'text',
        },
        password:{
          label:'Password',
          type:'password',
        }
      },
      async authorize(credentials){
          await connectDb()
          const user = await Userr.findOne({email:credentials!.email})

          if(!user){
            throw new Error('Email is not registered.')
          }
          const isPasswordCorrect = await bcrypt.compare(credentials!.password, user?.password);

          if(!isPasswordCorrect){
            throw new Error("Password is incorrect.");
          }

          return user;
      },
    }),
  
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  pages:{
    signIn:"/auth",
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user?: User | AdapterUser;
      account?: Account | null;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      if (user) {
        token.provider = account?.provider;
      }

      return token;
    },
    async session({session, token}: {session: any; token: JWT}) {
      console.log(token);
      if (session.user) {
        session.user.provider = token.provider;
      }
      return session;
    },
  },
});
