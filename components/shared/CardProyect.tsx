"use client";
import { Button } from "./Button";
import { IoLinkOutline } from "react-icons/io5";
import { Project } from "@/interfaces/types";
import { CldImage } from "next-cloudinary";


interface Props {
 project: Project   
}

export const CardProyect = ({ project }: Props) => {
    
    return (
        <div className="flex flex-col gap-6 shadow-xl dark:bg-background-tertiary p-3 rounded-lg my-4 ">
            <img
                src={ project?.images[0].url }
                alt="Shoes" 
                width={200} 
                height={75} 
                loading="lazy"
                className="rounded-lg object-cover hover:scale-105 transition duration-300 h-52 mx-auto w-full"
            />
            
            <div className="flex flex-col justify-between">
                <div>
                    <h2 className="">{ project?.title }</h2>
                </div>
                <div className="">
                    <a href={ project?.url } target="_blank"><Button icon={<IoLinkOutline size={20}/>} className="mt-4">Ver mas</Button></a>
                </div>
            </div>
        </div>
    )
}