import { IoBriefcaseOutline } from 'react-icons/io5'
import { CardExperience } from './CardExperience';
import styles from './cards_section.module.css';
export const ExperienceSection = () => {


    const experieces = [
        {
            title: 'Frontend Developer',
            job: 'Freelance',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, dolore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, dolore.',
            technologies: ['React', 'Next.js', 'Tailwind'],
            date: '2020-2021'
        },
        {
            title: 'Frontend Developer',
            job: 'Freelance',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, dolore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, dolore.',
            technologies: ['React', 'Next.js', 'Tailwind'],
            date: '2020-2021'
        }
    ]

    return (
        <section className="flex flex-col relative gap-4 mt-8 md:mt-32" id='experiences'>
            <div className=' flex gap-4'>
                <IoBriefcaseOutline size={35}/>
                <h1 className="text-2xl font-semibold">Experiencias</h1>
            </div>

            <div>
                <div className='flex flex-col justify-center items-center'>

                    {
                        experieces.map((experience, index) => (
                            
                            <div key={index} className={`${styles.cards_section}`}>
                                <CardExperience experience={experience}  />
                            </div>
                        ))
                    }  
                </div>
            </div>
        </section>
    )
}