import { ExperienceSection } from '@/components/shared/ExperienceSection';
import { HeroSection } from '../components/shared/HeroSection';
import { ProyectsSection } from '@/components/shared/ProyectsSection';
import { CoursesSection } from '@/components/shared/CoursesSection';
import {getCourses, getExperiences, getTechs, getProjects} from '@/actions';

export const metadata = {
  title: 'Mi protafolio',
  description: 'portafolio de Manuel urdaneta como desarrollador web',
}
 

export default async function Home() {

  const getData = async () => {
    const [technologies, experiences, projects, courses] = await Promise.all([getTechs(), getExperiences(), getProjects(), getCourses()]);

    return { technologies, experiences, projects, courses };
  }

  const data = await getData();
  console.log(data);
  return (
    <>
    <div className='px-4 md:px-32 max-w-6xl mx-auto min-h-screen'>
      <HeroSection />
      <ExperienceSection experiences={data.experiences}/>
      <ProyectsSection projects={data.projects}/>
      <CoursesSection courses={data.courses}/>
    </div>
    </>
  );
}
