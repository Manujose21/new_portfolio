import { createCourse } from '@/actions/createCourse';
import { Form } from '../../../components/admin/Form';

export default function CoursesPage() {
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
      </div>
    );
  }