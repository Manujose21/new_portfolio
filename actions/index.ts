'use server'
import { prisma } from '@/prisma/prismaClient'

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

export const getCourses = async () => {
    try {
        const courses = await prisma.courses.findMany()
        return courses;
        
    } catch (error) {
        throw error
    }
}

export const getExperiences = async () => {
    try {
        const experiences = await prisma.experience.findMany({
            include: {
                technologies: true
            }
        });
        return experiences;
        
    } catch (error) {
        throw error
    }
}
 
export const getProjects = async () => {
    try {
        const projects = await prisma.proyects.findMany({
            include: {
                technologies: true
            }
        });
        
        return projects;
    } catch (error) {
        throw error
    }
}
export const getTechs = async () => {
    try {
        const technologies = await prisma.technologies.findMany();
        return technologies;
        
    } catch (error) {
        throw error
    }
}
  
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

export const updateTech = async (id: string, name: string) => {
    try {
        const tech = await prisma.technologies.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        return tech
    } catch (error) {
        console.log(error)
    }
}

export const updateCourse = async (id: string, course: string, description: string, image: string, date: string) => {
    try {
        const courseUpdated = await prisma.courses.update({
            where: {
                id
            },
            data: {
                course,
                description,
                certificate: image,
                date
            }
        })
        return courseUpdated
    } catch (error) {
        console.log(error)
    }
}

export const updateExperience = async (id: string, title: string, job: string, description: string, start: string, end: string) => {
    try {
        const experienceUpdated = await prisma.experience.update({
            where: {
                id
            },
            data: {
                title,
                job,
                description,
                start_date: start,
                end_date: end
            }
        })
        return experienceUpdated
    } catch (error) {
        console.log(error)
    }
}

export const updateProyect = async (id: string, title: string, description: string, image: string, url: string, techsId: string[]) => {
    try {
        const proyectUpdated = await prisma.proyects.update({
            where: {
                id
            },
            data: {
                title,
                description,
                image,
                url
            }
        })


        techsId.forEach(async (id: string) => {
            await prisma.proyects_Technologies.update({
                where: {
                    id
                },
                data: {
                    technologiesId: id,
                    proyectId: proyectUpdated.id
                }
            })
        })

        return proyectUpdated
    } catch (error) {
        console.log(error)
    }
}

export const deleteTech = async (id: string) => {
    try {
        const techDeleted = await prisma.technologies.delete({
            where: {
                id
            }
        })
        return techDeleted
    } catch (error) {
        console.log(error)
    }
}

export const deleteCourse = async (id: string) => {
    try {
        const courseDeleted = await prisma.courses.delete({
            where: {
                id
            }
        })
        return courseDeleted
    } catch (error) {
        console.log(error)
    }
}

export const deleteExperience = async (id: string) => {
    try {
        const experienceDeleted = await prisma.experience.delete({
            where: {
                id
            }
        })
        return experienceDeleted
    } catch (error) {
        console.log(error)
    }
}

export const deleteProyect = async (id: string) => {
    try {
        const proyectDeleted = await prisma.proyects.delete({
            where: {
                id
            }
        })
        return proyectDeleted
    } catch (error) {
        console.log(error)
    }
}
