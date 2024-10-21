import { ExperienceSection } from '@/components/shared/ExperienceSection';
import { HeroSection } from '../components/shared/HeroSection';
import { ProyectsSection } from '@/components/shared/ProyectsSection';
import { CoursesSection } from '@/components/shared/CoursesSection';


export const metadata = {
  title: 'Mi protafolio',
  description: 'portafolio de Manuel urdaneta como desarrollador web',
}

export default function Home() {
  return (
    <>
    <div className='px-4 md:px-32 max-w-6xl mx-auto min-h-screen'>
      <HeroSection />
      <ExperienceSection />
      <ProyectsSection />
      <CoursesSection />
    </div>
    </>
  );
}
