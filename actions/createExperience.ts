'use server'
import { prisma } from '@/prisma/prismaClient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createExperience = async ({ title, job, description, start, end, technologies: techsId }: {[key: string]: any}) => {
    try {
      
      const experience = await prisma.experience.create({
        data: {
          title,
          job,
          description,
          start_date: start,
          end_date: end
        },
      })

      console.log(techsId)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any  
      techsId.forEach(async (element: string )=> {
        await prisma.experience_Technologies.create({
            data: {
                experienceId: experience.id,
                technologiesId: element
            }
        })
      });

    } catch (error) {
      console.log(error)
    }
    
  }