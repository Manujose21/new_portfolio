'use server'
import { prisma } from '@/prisma/prismaClient'

export interface Course {
    course: string,
    description: string,
    certificate: string,
    date: string
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCourse = async ({ course, description, image, date }: {[key:string]: any}): Promise<any> => {

    try {
        console.log(course, description, image, date)
        const courseCreated = await prisma.courses.create({
            data: {
                course,
                description,
                certificate: image,
                date
            },
        })

        return courseCreated
        
    } catch (error) {
        console.log(error)
        return null
    }

}