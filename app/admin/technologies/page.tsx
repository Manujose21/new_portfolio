import { getTechs } from '@/actions';
import { TechnologiesPage } from '@/components/admin/TechnologiesPage';

export default async function TecnologiesPage() {
  
  const technologies = await getTechs();
  
  return (
    <>
      <TechnologiesPage technologies={technologies}/>
    </>
  );
}