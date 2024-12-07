'use client';
import { IoHandLeft, IoCodeSlash, IoBriefcase, IoBook } from "react-icons/io5";
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import { useThemes } from "@/hooks/useThemes";
import { usePathname } from "next/navigation";
export const Menu = () => {

    const { toggleTheme, theme } = useThemes();
    const path = usePathname();

    return (
        <>
            {
               (path !== "/admin" && path !== "/admin/proyects" && path !== "/admin/experiences" && path !== "/admin/technologies" && path !== "/admin/courses") 
               ? <header className="p-4 border-zinc-900 flex items-center justify-between gap-3 sticky top-0 z-10">
                    <div className="absolute top-5 right-5 cursor-pointer">
                        {
                            (theme === '') 
                            ? <IoMdMoon size={20}  onClick={toggleTheme}></IoMdMoon>
                            : <IoMdSunny size={20} onClick={toggleTheme}></IoMdSunny>
                        }
                    </div>
                    <nav className="flex justify-center md:justify-center flex-1">
                        <ul className="flex gap-4 py-2 px-4 text-sm shadow-sm shadow-background-quaternary rounded-full bg-background-secondary bg-opacity-50 backdrop-blur-sm ">
                            <li className="list-none hover:text-revolver-800  dark:hover:text-revolver-300 flex gap-1 items-center">
                                <IoHandLeft size={12}/>
                                <a href="#aboutMe">Sobre mí</a>
                            </li>
                            <li className="list-none hover:text-revolver-800 dark:hover:text-revolver-300 flex gap-1 items-center">
                                <IoCodeSlash size={13}/>
                                <a href="#experiences">Experiencias</a>
                            </li>
                            <li className="list-none hover:text-revolver-800 dark:hover:text-revolver-300 flex gap-1 items-center">
                                <IoBriefcase size={12} />
                                <a href="#projects">Proyectos</a>
                            </li>
                            <li className="list-none hover:text-revolver-800 dark:hover:text-revolver-300 flex gap-1 items-center">
                                <IoBook size={12} />
                                <a href="#courses">Cursos</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                : ''
            }

        </>
    );
}