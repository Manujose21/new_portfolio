import { Experience } from "@/interfaces/types";
import { Button } from "./Button";
import { IoLinkOutline } from "react-icons/io5";



interface Props {
    experience: Experience,
}

export const CardExperience = ({experience}: Props) => {

    return (
        <div className="gap-6 shadow-xl  bg-opacity-45 p-4 rounded-lg my-4 border-2 border-background-quaternary min-w-fit">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="col-span-1">
                    <h2 className="text-xl font-bold text-white text-nowrap">{ experience.title }</h2>
                    <small className="text-zinc-400">{ experience.start_date } / { experience.end_date }</small>
                </div>
                <div className="col-span-3 w-full">
                    <p>{ experience.description }</p>
                    <div className="flex justify-end">
                        <Button icon={<IoLinkOutline size={20}/>} className="mt-4">Ver mas</Button>
                    </div>
                </div>
            </div> 
        </div>
    )
}