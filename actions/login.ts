'use server';	
import { prisma } from '../prisma/prismaClient'
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose'

export const login = async (email: string, password:string) => {
    
    const user  = await prisma.admin.findUnique({ where: {  email } })
    if(!user) return null;


    if(!bcrypt.compareSync(password, user.password)) return null;

    
    const userResponse = { 
        id: user.id,
        name: user.name,
        email: user.email,
        token: ''    
    }
    // encode secret key
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!) 
    
    // generate token
    const token = await new SignJWT(user)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt() 
        .setExpirationTime('2h')
        .sign(secret); 

    userResponse.token = token

    return userResponse


}