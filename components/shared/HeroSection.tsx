import { IoLogoGoogle, IoLogoLinkedin, IoLogoGithub, IoCodeSlash } from "react-icons/io5";
import { Button } from "./Button";
import styles from "./hero_section.module.css";
export const HeroSection = ({className}: {className?: string}) => {
    return (
        <section className={`flex flex-col gap-4 mt-8 md:mt-32 relative ${className}`}>
            <IoCodeSlash size={100} className={`absolute top-0 right-0 ${styles.animation_icon}`}/>
            <div className="max-w-xl">
                <h1 className="text-5xl font-bold">Hey, soy Manuel 👋</h1>
                <p className="text-xl font-medium mt-4"> 
                    Soy un desarrollador web
                    <span className="text-revolver-300">
                        {' '}frontend que ama transformar ideas en realidad digital.{' '}
                    </span>
                    Siempre buscando aprender nuevas tecnologías y colaborar en proyectos innovadores.
                </p>
                <div className="flex gap-4 mt-4">
                    <Button icon={<IoLogoLinkedin size={20}/>} className="mt-4" >
                        Linkedin
                    </Button>
                    <Button icon={<IoLogoGoogle size={20}/>} className="mt-4" >
                        Gmail
                    </Button>
                    <Button icon={<IoLogoGithub size={20}/>} className="mt-4" >
                        Github
                    </Button>
                </div>
            </div>
      </section>
    );
}