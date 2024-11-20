import { createCourse } from '@/actions';
import { Form } from '../../../components/admin/Form';
import { Table } from '../../../components/shared/Table';
import { IoPencil, IoTrash } from 'react-icons/io5';
import { getCourses } from "@/actions"

export default async function CoursesPage() {

  const courses = await getCourses();
  console.log(courses);

    return (
      <div>
        <h1 className="text-2xl font-bold">Crear un nuevo curso en mi portafolio</h1>
        <div className='flex justify-center mt-4'>
          <Form fields={{
            course: '',
            description: '',
            image: null,
            date: '',
          }}
          formAction='courses'
          action={createCourse} />
        </div>

        <div>
          <h1 className='text-2xl font-bold'>Tabla de cursos</h1>
          <Table 
            headers={['Curso', 'Descripcion', 'Certificado', 'Fecha', 'Acciones']} 
          >
            
            {
              courses.map((course: any, index) => (
                <tr key={index} className='border-b border-blue-gray-200'>
                  <td className='py-3 px-4'>
                    {course.course}
                  </td>
                  <td className='py-3 px-4'>
                    {course.description}
                  </td>
                  <td className='py-3 px-4'>
                    {course.image}
                  </td>
                  <td className='py-3 px-4'>
                    {course.date}
                  </td>
                  <td className='py-3 px-4 flex gap-4 justify-center'>
                    <IoPencil size={25} className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm'></IoPencil>
                    <IoTrash size={25} className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm' color='#f05353'></IoTrash>
                  </td>
                </tr>
              ))
            }
          </Table>
        </div>
      </div>
    );
  }