'use server'
import { prisma } from '@/prisma/prismaClient'
import { deleteImage} from './cloudinary.actions'
import { Project } from '@/interfaces/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCourse = async ({ course, description, image, date, externalId }: {[key:string]: any}): Promise<any> => {

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

        await prisma.images_Courses.create({
            data: {
                url: image,
                external_id: externalId,
                course_id: courseCreated.id
            }
        })

        return courseCreated
        
    } catch (error) {
        console.log(error)
        return null
    } finally {
        prisma.$disconnect()
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
    } finally {
        prisma.$disconnect()
    }
    
  }

  
export const createProyect = async ({ title, url, description, externalId, technologies: techsId, image }: {[key: string]: any}) => {

    try {

        const proyect = await prisma.proyects.create({
            data: {
                title,
                description,
                url
            },
        })

        await prisma.images_Proyects.create({
            data: {
                url: image,
                external_id: externalId,
                proyect_id: proyect.id
            }
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
    } finally {
        prisma.$disconnect()
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
    } finally {
        prisma.$disconnect()
    }

}

export const getCourses = async () => {
    try {
        const courses = await prisma.courses.findMany({
            include: {
                images: true
            }
        });
        
        return courses;
        
    } catch (error) {
        throw error
    } finally {
        prisma.$disconnect()
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
    } finally {
        prisma.$disconnect();   
    }
}
 
export const getProjects = async () => {
    try {
        const projects = await prisma.proyects.findMany({
            include: {
                technologies: true,
                images: true
            }
        });
        
        return projects;
    } catch (error) {
        throw error
    } finally {
        prisma.$disconnect();   
    }
}
export const getTechs = async () => {
    try {
        const technologies = await prisma.technologies.findMany();
        return technologies;
        
    } catch (error) {
        throw error
    } finally {
        prisma.$disconnect()
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
        
    } finally {
        prisma.$disconnect()
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
    } finally {
        prisma.$disconnect()
    }
}

export const updateCourse = async (course: {id: string, course: string, description: string, certificate: string, date: string, images: { url: string, external_id: string, id: string }[]}) => {
    try {
        const courseUpdated = await prisma.courses.update({
            where: {
                id: course.id
            },
            data: {
                course: course.course,
                description: course.description,
                certificate: course.certificate,
                date: course.date
            },
        })


        console.log(course.images)

        await prisma.images_Courses.update({
            where: {
                id: course.images[0].id
            },
            data: {
                url: course.images[0].url,
                external_id: course.images[0].external_id
            }
        })

        return courseUpdated
    } catch (error) {
        console.log(error)
    } finally {
        prisma.$disconnect()
    }
}

export const updateExperience = async (
    experience: {
    id: string, 
    title: string, 
    job: string, 
    description: string, 
    start: string, 
    end: string
}) => {
    try {
        const experienceUpdated = await prisma.experience.update({
            where: {
                id: experience.id
            },
            data: {
                title: experience.title,
                job: experience.job,
                description: experience.description,
                start_date: experience.start, 
                end_date: experience.end,
            }
        })
        return experienceUpdated
    } catch (error) {
        console.log(error)
    } finally {
        prisma.$disconnect()
    }
}

export const updateProyect = async (
    project: {
        id: string, 
        title: string, 
        description: string, 
        url: string, 
        images: { url: string, external_id: string, id: string }[]
    }
) => {

    try {
        const proyectUpdated = await prisma.proyects.update({
            where: {
                id: project.id
            },
            data: {
                title: project.title,
                description: project.description,
                url: project.url
            }
        })

        await prisma.images_Proyects.update({
            where: {
                id: project.images[0].id
            },
            data: {
                url: project.images[0].url,
                external_id: project.images[0].external_id
            }
        })


        return proyectUpdated
    } catch (error) {
        console.log(error)
    } finally {
        prisma.$disconnect()
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
    } finally {
        prisma.$disconnect()
    }
}

export const deleteCourse = async (id: string) => {
    try {
        const courseDeleted = await prisma.courses.delete({
            where: {
                id
            },
            include: {
                images: true
            }
        })
        
        await deleteImage(courseDeleted.images[0].external_id)

        return courseDeleted
    } catch (error) {
        console.log(error)
    } finally {
        prisma.$disconnect()
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
    } finally {
        prisma.$disconnect()
    }
}

export const deleteProyect = async (id: string) => {
    
    try {
        
        const proyectDeleted = await prisma.proyects.delete({
            where: {
                id
            },
            include: {
                images: true
            }
        })

        await deleteImage(proyectDeleted.images[0].external_id)

        return proyectDeleted
    } catch (error) {
        console.log(error)
    } finally {
        prisma.$disconnect()
    }   
}

export const filterProjectByTech = async (id: string) => {

    try {
        const projects = await prisma.proyects.findMany({
            include: {
                images: true,
                technologies: true
            },
            where: {
                technologies: {
                    some: {
                        technologiesId: id
                    }
                }
            }
        })

        return projects
    } catch (error) {
        throw error
    }

}