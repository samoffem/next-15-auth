"use server"

import { User } from "@prisma/client";
import { prisma } from "../prisma";
import * as bcrypt from 'bcrypt'

export async function registerUser(user: Omit<User, "id"| "emailVerified"|"image"|"createdAt"|"updatedAt">){
  
    try {
        const result =  await prisma.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }
        })
    } catch (error) {
        console.log('err', error)
    }
   
}
