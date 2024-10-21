'use server'
import { prisma } from '@/prisma/prismaClient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createProyect = async ({ title, url, image, description, technologies: techsId }: {[key: string]: any}) => {

    try {

        const proyect = await prisma.proyects.create({
            data: {
                title,
                description,
                image,
                url
            },
        })

        techsId.forEach(async (element: string) => {
            await prisma.proyects_Technologies.create({
                data: {
                    technologiesId: element,
                    proyectId: proyect.id
                }
            })
        })
                
        
    } catch (error) {
        console.log(error)
    }

}