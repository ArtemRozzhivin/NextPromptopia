import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {connectToDB} from '@utils/database'
import User from "@models/user"


const clientId = process.env.CLIENT_ID
const clientSecretId = process.env.CLIENT_SECRET_ID

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecretId,
    })
  ],
  
  callbacks: {
    async session({session}) {
      const sessionUser = await User.findOne({
        email: session.user.email
      }).lean()

      session.user.id = sessionUser._id
  
      return session
    },
  
    async signIn ({profile}) {
      try {
        await connectToDB()
  
        //if user already exists
        const userExists = await User.findOne({
          email: profile.email
        })
  
        //if not, create new user
        if(!userExists){
          await User.create({
            email: profile.email,
            username: profile.name.replaceAll(/\s/g, '').toLowerCase(),
            image: profile.picture
          })
        }
  
        return true
      } catch (error) {
        
      }
    },
  }
})

export {handler as GET, handler as POST}