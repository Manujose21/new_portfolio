import { Table } from '@/components/shared/Table';
import { Form } from '../../../components/admin/Form';
import { createTech } from '@/actions';
import { getTechs } from '@/actions';
import { IoPencil, IoTrash } from 'react-icons/io5';
export default async function TecnologiesPage() {
  
  const technologies = await getTechs();

  return (
    <div >
        <h1 className="text-2xl font-bold">Crear una nueva tenologia en mi portafolio</h1>
        <div className="flex justify-center mt-16">
          <Form formAction='technologies' fields={{name: ''}} action={createTech}/>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Tabla de Tecnologias</h1>
          <Table 
              headers={["#","Tecnologia", "Acciones"]} 
              >
                
              {
                (technologies.length > 0) ?
                technologies.map((tech: any, index) => (
                  <tr key={index} className='border-b border-blue-gray-200'>
                    <td className='py-3 px-4'>{index + 1}</td>
                    <td className='py-3 px-4'>
                      {tech.name}
                    </td>
                    <td className='py-3 px-4 flex'>
                      <IoPencil size={25} className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm mx-2'></IoPencil>
                      <IoTrash size={25} className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm ' color='#f05353'></IoTrash>
                    </td>
                  </tr>
                ))
                : <tr>
                  <td className="py-3 px-4 text-center" colSpan={6}>No hay tecnologias creadas para mostrar</td>
                </tr>
              }
          </Table>
        </div>
    </div>
  );
}