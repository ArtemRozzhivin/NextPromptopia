import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {connectToDB} from '@utils/database'
import User from "@models/user"


const clientId = process.env.CLIENT_ID
const clientSecretId = process.env.CLIENT_SECRET_ID

// console.log(clientId, clientSecretId)

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecretId,
    })
  ],

  async session({session}) {
    const sessionUser = User.findOne({
      email: session.user.email
    })

    session.user.id = sessionUser._id.toString()

    return session
  },

  async signIn ({profile}) {
    try {
      await connectToDB()

      //if user already exists
      const userExists = User.findOne({
        email: profile.email
      })

      //if not, create new user
      if(!userExists){
        const user = User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture
        })
      }

      return true
    } catch (error) {
      
    }
  },
})

export {handler as GET, handler as POST}