import { IoBriefcaseOutline } from 'react-icons/io5'
import { CardExperience } from './CardExperience';
import styles from './cards_section.module.css';
import { Experience } from '@/interfaces/types';


interface Props {
    experiences: Experience[]
}

export const ExperienceSection = ({ experiences }: Props) => {



    return (
        <section className="flex flex-col relative gap-4 mt-8 md:mt-16" id='experiences'>
            <div className=' flex gap-4'>
                <IoBriefcaseOutline size={35}/>
                <h1 className="text-2xl font-semibold">Experiencias</h1>
            </div>

            <div>
                <div className='grid grid-cols-1 gap-4'>

                    {
                        experiences.map((experience, index) => (
                            
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