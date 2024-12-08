"use client";
import { IoCodeSlash } from 'react-icons/io5'
import { CardProyect } from './CardProyect'
import { Button } from './Button'
import { Project, Technologies } from '@/interfaces/types'
import React, { useState } from 'react';
import { filterProjectByTech } from '@/actions';

interface Props {
    projects: Project[]
    technologies: Technologies[]
}


export const ProyectsSection = ({ projects, technologies }: Props) => {

    const [myProjects, setMyProjects] = useState<Project[]>(projects);

    const filterProjects = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const tech = event.target.value;
        if (tech === 'all') return setMyProjects(projects);
        if (tech === '') return setMyProjects(projects);

        try {
            const filteredProjects = await filterProjectByTech(tech);
            setMyProjects(filteredProjects as Project[]);
        } catch (error) {
            console.log(error);
        }
       
    }

    return (
        <section className="flex flex-col gap-4  mt-8 md:mt-32" id='projects'>
            <div className=' flex gap-4'>
                <IoCodeSlash size={35}/>
                <h1 className="text-2xl font-semibold">Mis Proyectos</h1>
            </div>
            <div className='flex flex-col'>
                <div className='flex gap-4'>
                    <select onChange={filterProjects} name="" id="" className='p-2 rounded-md w-1/2 dark:bg-background-secondary'>
                        <option value="all">all</option>
                        {
                            technologies.map((technology, index) => (
                                <option  value={technology.id} key={index}>{technology.name}</option>
                            ))
                        }
                    </select>
                    <Button >Buscar</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {
                    (myProjects.length > 0) 
                    ? myProjects.map((project: Project, index: number) => (
                        <CardProyect project={project} key={index} />
                    ))
                    : <p className='col-span-3 text-center text-2xl font-semibold mt-5'>No hay proyectos aun con esta tecnologia</p>
                }
            </div>
        </section>
    )
}
