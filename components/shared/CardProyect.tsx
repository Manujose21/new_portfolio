import Image from "next/image"
import { Button } from "./Button";
import { IoLinkOutline } from "react-icons/io5";

export const CardProyect = () => {
    return (
        <div className="flex flex-col gap-6 shadow-xl dark:bg-background-tertiary p-3 rounded-lg my-4 ">
            <Image 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Shoes" 
                width={200} 
                height={75} 
                loading="lazy"
                className="rounded-lg object-cover hover:scale-105 transition duration-300 h-52 mx-auto w-full"
            />
            <div className="flex flex-col justify-between">
                <div>
                    <h2 className="">Shoes!</h2>
                </div>
                <div className="">
                    <Button icon={<IoLinkOutline size={20}/>} className="mt-4">Ver mas</Button>
                </div>
            </div>
        </div>
    )
}