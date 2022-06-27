import NextAuth from "next-auth"
// import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '../../../lib/prisma'
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    // DiscordProvider({
    //   clientId: process.env.DISCORD_CLIENT_ID,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials

        const user = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });

        if (user && await bcrypt.compare(password, user.password)) {
          return {
            user: {
              id: user.id,
              username: user.username,
            },
          }
        }

        return null;
      },
    }),
  ],
  theme: {
    colorScheme: 'dark',
    colorPrimary: '#F49E4B',
    // logo: 'https://i.imgur.com/F4p34dJ.png'
  }
})