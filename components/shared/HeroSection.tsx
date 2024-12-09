import { IoLogoGoogle, IoLogoLinkedin, IoLogoGithub, IoCodeSlash } from "react-icons/io5";
import { Button } from "./Button";
import styles from "./hero_section.module.css";
import { TechsSection } from "./TechsSection";
import { Technologies } from "@/interfaces/types";

interface Props {
    className?: string
    techs: Technologies[]
}
export const HeroSection = ({className, techs}: Props) => {
    return (
        <section id="aboutMe" className={`flex flex-col gap-4 mt-8 md:mt-32 relative ${className}`}>
            <IoCodeSlash size={100} className={`absolute top-0 right-0 ${styles.animation_icon}`}/>
            <div className="max-w-xl">
                <h1 className="text-5xl font-bold">Hey, soy Manuel 👋</h1>
                <p className="text-xl font-medium mt-4"> 
                    Soy un desarrollador web
                    <span className="text-revolver-500">
                        {' '}frontend que ama transformar ideas en realidad digital.{' '}
                    </span>
                    Siempre buscando aprender nuevas tecnologías y colaborar en proyectos innovadores.
                </p>
                <div className="flex gap-4 mt-4">
                    <a target="_blank" href="https://www.linkedin.com/in/manuel-urdaneta-474412240/">
                        <Button icon={<IoLogoLinkedin size={20}/>} className="mt-4" >
                            Linkedin
                        </Button>
                    </a>
                    <a target="_blank" href="https://mail.google.com/mail/u/0/?fs=1&to=m4nufra@gmail.com&tf=cm">
                        <Button icon={<IoLogoGoogle size={20}/>} className="mt-4" >
                            Gmail
                        </Button>
                    </a>
                    <a target="_blank" href="https://github.com/Manujose21">
                        <Button icon={<IoLogoGithub size={20}/>} className="mt-4" >
                            Github
                        </Button>
                    </a>
                </div>
            </div>
            <TechsSection techs={techs}/>
      </section>
    );
}