import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import User from '@models/user'
import { connectToDB } from '@utils/database'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      try {
        if (user) {
          // Store the user id from MongoDB to session
          const sessionUser = await User.findOne({ email: user.email })
          if (sessionUser) {
            session.user.id = sessionUser._id.toString()
          }
        }
        return session
      } catch (error) {
        console.log('Error while creating session:', error)
        return session
      }
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB()

        // Generate username based on email
        const username = profile.email.split('@')[0].toLowerCase()

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email })

        // Else create and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: username,
            image: profile.picture,
          })
        }

        return true
      } catch (error) {
        console.log('Error checking if user exists:', error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
