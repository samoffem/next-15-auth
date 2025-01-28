import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import email from "next-auth/providers/email";
import { prisma } from "./lib/prisma";
import * as bcrypt from "bcrypt"

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {
                    label: "User Name",
                    type: "text",
                    placeholder: "your username"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            
            authorize: async (credentials)=>{
                let user = null

                user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username as string
                    }
                })

                if(!user) throw new Error("User name or password is incorrect")

                // const isPasswordCorrect = credentials?.password === user.password
                if(!credentials.password) throw new Error("Please provide your password")
                
                const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password)

                if(!isPasswordCorrect) throw new Error("User name or password is nnot correct")
                
                const  {password, ...userWithoutPassword} = user

                
                return userWithoutPassword
            }
        })
    ]
})