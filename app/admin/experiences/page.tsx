import { Form } from "@/components/admin/Form";
import { getTechs } from '@/actions'
import { createExperience } from '@/actions'
import { Table } from "@/components/shared/Table";
import { getExperiences } from "@/actions";
import { IoPencil, IoTrash } from "react-icons/io5";

export default async function ExperiencesPage() {
  
  const technologies = await getTechs();

  const experiences = await getExperiences()

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold">Crear una nueva experiencia en mi portafolio</h1>
      <div className="flex justify-center mt-4">
        <Form 
          formAction='experiences' 
          fields={{
            title: '',
            job: '',
            description: '',
            start: '',
            end: '',
            technologies: []
          }}
          action={createExperience} 
          technologies={technologies}
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Tabla de Experiencias</h1>
        <Table 
              headers={['Empresa', 'Puesto de trabajo', 'Descripcion', 'Fecha de Inicio', 'Fecha de Fin', 'Acciones']} 
            >
              
            {
              (experiences.length > 0) ?
              experiences.map((experience: any, index) => (
                <tr key={index} className='border-b border-blue-gray-200'>
                  <td className='py-3 px-4'>
                    {experience.title}
                  </td>
                  <td className='py-3 px-4'>
                    {experience.job}
                  </td>
                  <td className='py-3 px-4'>
                    {experience.description}
                  </td>
                  <td className='py-3 px-4'>
                    {experience.start_date}
                  </td>
                  <td className='py-3 px-4'>
                    {experience.end_date}
                  </td>

                  <td className='py-3 px-4 flex gap-4 justify-center'>
                    <IoPencil size={25} className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm'></IoPencil>
                    <IoTrash size={25} className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm' color='#f05353'></IoTrash>
                  </td>
                </tr>
              ))
              : <tr>
                <td className="py-3 px-4 text-center" colSpan={6}>No hay experiencias creadas para mostrar</td>
              </tr>
            }
        </Table>
      </div>
    </div>
  );
}