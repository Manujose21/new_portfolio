import { Form } from "@/components/admin/Form";
import { getTechnologies } from '@/actions/getTechs'
import { createExperience } from '@/actions/createExperience'

export default async function ExperiencesPage() {
  
  const technologies = await getTechnologies();

  return (
    <div>
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
    </div>
  );
}