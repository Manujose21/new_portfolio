import { Form } from '../../../components/admin/Form';
import { createTech } from '@/actions/createTech';
export default function TecnologiesPage() {
 
  return (
    <div >
        <h1 className="text-2xl font-bold">Crear una nueva tenologia en mi portafolio</h1>
        <div className="flex justify-center mt-16">
          <Form formAction='technologies' fields={{name: ''}} action={createTech}/>
        </div>
    </div>
  );
}