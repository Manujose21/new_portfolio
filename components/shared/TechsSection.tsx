import { Technologies } from "@/interfaces/types"
import { IoLaptopOutline } from "react-icons/io5"
import { logos }from "@/utils/logos"
import Image from "next/image"

interface Props { 
    techs: Technologies[]
}
export const TechsSection = ({techs}: Props) => {


    const findImage = (name: string) => {
        const nameTech = name.toLowerCase()
        const logosArray = Object.values(logos)
        const imgSrc = logosArray.find((logo) => logo.includes(nameTech) && logo)
        console.log(imgSrc)
        return imgSrc
    }

    return (
        <section className="mt-4">
            <div className=' flex gap-4'>
                <IoLaptopOutline size={25}/>
                <h1 className="text-xl font-semibold">Tecnologias</h1>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
                {techs.map((tech, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        {tech.name}
                        <Image width={25} height={25} src={findImage(tech.name) ?? '/images/default.png'} alt={tech.name} />
                    </div>
                ))}
            </div>
        </section>
    )
}