import { Button } from "./Button";
import { IoLinkOutline } from "react-icons/io5";

interface Experience {
    title: string;
    job: string;
    description: string;
    technologies: string[];
    date: string;
}

interface Props {
    experience: Experience,
}

export const CardExperience = ({experience}: Props) => {

    return (
        <div className="flex gap-6 shadow-xl  bg-opacity-45 p-4 rounded-lg w-full my-4 max-w-2xl border-2 border-background-quaternary">
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white text-nowrap">{ experience.title }</h2>
                    <small className="text-zinc-400">{ experience.date }</small>
                </div>
                <div className="">
                    <p>{ experience.description }</p>
                    <Button icon={<IoLinkOutline size={20}/>} className="float-right mt-4">Ver mas</Button>
                </div>
            </div> 
        </div>
    )
}