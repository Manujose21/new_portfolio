import { Form } from "@/components/admin/Form";
import { createProyect } from "@/actions";
import { getTechs } from "@/actions";
import { Table } from "@/components/shared/Table";
import { getProjects } from "@/actions";
import { IoPencil, IoTrash } from "react-icons/io5";
export default async function ProyectsPage() {

  const technologies = await getTechs();

  const projects = await getProjects();

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold">Crear un nuevo proyecto en mi portafolio</h1>
      <div className="flex justify-center mt-4">
        <Form 
          formAction='proyects' 
          fields={{
            title: '',
            description: '',
            url: '',
            image: null,
            technologies: [],
          }} 
          action={createProyect}
          technologies={technologies}
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Tabla de Proyectos</h1>

        <Table 
              headers={['Titulo del proyecto', 'Descripcion', 'Url', 'Imagen', 'Creado', 'Acciones']} 
            >
              
            {
              (projects.length > 0) ?
              projects.map((project: any, index) => (
                <tr key={index} className='border-b border-blue-gray-200'>
                  <td className='py-3 px-4'>
                    {project.title}
                  </td>
                  <td className='py-3 px-4'>
                    {project.description}
                  </td>
                  <td className="py-3 px-4">
                    {project.url}
                  </td>
                  <td className='py-3 px-4'>
                    {project.image}
                  </td>
                  <td className='py-3 px-4'>
                    {project.created_at}
                  </td>

                  <td className='py-3 px-4 flex gap-4 justify-center'>
                    <IoPencil size={25} className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm'></IoPencil>
                    <IoTrash size={25} className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm' color='#f05353'></IoTrash>
                  </td>
                </tr>
              ))
              : <tr>
                <td className="py-3 px-4 text-center" colSpan={6}>No hay proyectos creados para mostrar</td>
              </tr>
            }
        </Table>
      </div>
    </div>
  );
}