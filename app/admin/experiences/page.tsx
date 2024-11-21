import { getTechs } from '@/actions'
import { getExperiences } from "@/actions";
import { ExperiencePage } from '@/components/admin/ExperiencesPage';
export default async function ExperiencesPage() {
  
  const technologies = await getTechs();

  const experiences = await getExperiences()

  return (
    <>
      <ExperiencePage technologies={technologies} experiences={experiences}/>
    </>
  );
}