"use server";
import { cookies } from "next/headers";
import { setCookie, getCookie, getCookies } from "cookies-next/server";
import { jwtVerify, SignJWT} from "jose"


interface UserPayload {
    id: string,
    name: string,
    email: string,
    iat: number,
    exp: number
}
export const verifyToken = async (token: string):Promise<UserPayload | null>  =>{
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    try {
        
        const { payload } = await jwtVerify(token, secret ) as { payload: UserPayload}
        if (!payload ) {
            return null;
        }
       
        if (isTokenExpiring(payload.exp, 600)) { 
            const newToken = await new SignJWT({ id: payload.id, name: payload.name, email: payload.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt() 
            .setExpirationTime('1h')
            .sign(secret); 
            
            const newPayload = await jwtVerify(newToken, secret ) as { payload: UserPayload}                      
            await setCookie('token', newToken, { cookies })

            return newPayload.payload
        }
        
        return payload;
    } catch (error) {
        console.log(error)
        return null
    }
}

function isTokenExpiring(expirationTime: number, threshold = 300) {
   
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const timeRemaining = expirationTime - nowInSeconds;

    return timeRemaining < threshold;
  }