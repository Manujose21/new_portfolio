import { jwtVerify } from "jose"

interface UserPayload {
    id: string,
    name: string,
    email: string
}
export const verifyToken = async (token: string):Promise<UserPayload | null>  =>{
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    try {
        
        const { payload } = await jwtVerify(token, secret) as { payload: UserPayload}
        if (!payload) {
            return null;
        }

        return payload;
    } catch (error) {
        console.log(error)
        return null
    }
}

