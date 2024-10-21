import { Form } from "@/components/admin/Form";
import { createProyect } from "@/actions/createProyect";
import { getTechnologies } from "@/actions/getTechs";
export default async function ProyectsPage() {

  const technologies = await getTechnologies();

  return (
    <div>
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
    </div>
  );
}