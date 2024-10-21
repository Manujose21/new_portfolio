import { prisma } from '@/prisma/prismaClient'
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcrypt';


export async function GET(request: NextRequest, response: NextResponse) {

    console.log(request, response)

    const userExists = await prisma.admin.findUnique({ 
        where: { email: process.env.ADMIN_EMAIL},
    })

    if(!userExists) {
        const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD!, 10);
        await prisma.admin.create({
            data: {
                name: process.env.ADMIN_NAME!,  
                email: process.env.ADMIN_EMAIL!,
                password: hashedPassword
            }
        })

        return NextResponse.json({ message: 'Admin created' })
    }

    return NextResponse.json({ message: 'Admin already exists' })

}