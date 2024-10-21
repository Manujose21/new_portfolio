'use server'
import { prisma } from '@/prisma/prismaClient'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTech = async ( { name }: {[key:string]: any} ) => {
    const techExist = await prisma.technologies.findFirst({
        where: {
            name  
        }
    })

    if(techExist) {
        throw new Error('La tecnologia ya existe')
    } // alert('La tecnologia ya existe')

    try {

        const tech = await prisma.technologies.create({
            data: {
                name
            },
        })

        if(!tech) console.log('error al crear la tecnologia')

        console.log('Tecnologia creada')
        
    } catch (error) {
        console.log(error)
        // alert('error al crear la tecnologia')
    }

}