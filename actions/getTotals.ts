import { prisma } from '@/prisma/prismaClient'

export const getTotals = async () => {

    try {
        
        const totals = await Promise.all([

            prisma.courses.count(),
            prisma.technologies.count(),
            prisma.experience.count(),
            prisma.proyects.count(),

        ]).then( data => ({
            courses: data[0],
            technologies: data[1],
            experiences: data[2],
            proyects: data[3]
        }))

        return totals

    } catch (error) {
        console.log(error)
        throw error
        
    }

}