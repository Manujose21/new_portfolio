import { IoCodeSlash } from 'react-icons/io5'
import { CardProyect } from './CardProyect'
import { Button } from './Button'
import { Project } from '@/interfaces/types'

interface Props {
    projects: Project[]
}

export const ProyectsSection = ({ projects }: Props) => {

    return (
        <section className="flex flex-col gap-4  mt-8 md:mt-32" id='projects'>
            <div className=' flex gap-4'>
                <IoCodeSlash size={35}/>
                <h1 className="text-2xl font-semibold">Mis Proyectos</h1>
            </div>
            <div className='flex flex-col'>
                <div className='flex gap-4'>
                    <select name="" id="" className='p-2 rounded-md w-1/2 dark:bg-background-secondary'>
                        <option value="React">React.js</option>
                        <option value="Vue">Vue.js</option>
                        <option value="Node.js">Node.js</option>
                    </select>
                    <Button >Buscar</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {
                    projects.map((project, index) => (
                        <CardProyect project={project} key={index} />
                    ))
                }
            </div>
        </section>
    )
}