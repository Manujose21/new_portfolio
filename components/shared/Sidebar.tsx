import { IoBook, IoHammer, IoGitBranchOutline, IoLayersOutline } from 'react-icons/io5';
import Link from 'next/link';
export const Sidebar = () => {
    return (
        <>
            <aside className="min-h-screen w-64 bg-background-secondary text-color-text-primary p-4 ">
                <h1 className='text-xl text-white font-bold'>
                    <Link href={'/admin'}>
                        Mi portafolio
                    </Link>
                </h1>
                <ul className='flex flex-col gap-5 mt-8'>
                    <Link href={'/admin/proyects'}>
                        <li className="flex gap-2 hover:bg-background-primary cursor-pointer p-3 text-sm">
                            <IoLayersOutline size={18} />
                            Nuevo proyecto
                        </li>
                    </Link>
                    <Link href={'/admin/experiences'}>
                    
                        <li className="flex gap-2 hover:bg-background-primary cursor-pointer p-3 text-sm">
                            <IoHammer size={18} />
                            Nueva experiencia
                        </li>
                    </Link>
                    <Link href={'/admin/technologies'}>
                    
                        <li className="flex gap-2 hover:bg-background-primary cursor-pointer p-3 text-sm">
                            <IoGitBranchOutline size={18} />
                            Nueva tecnologia
                        </li>
                    </Link>
                    <Link href={'/admin/courses'}>
                    
                        <li className="flex gap-2 hover:bg-background-primary cursor-pointer p-3 text-sm">
                            <IoBook size={18}/>
                            Nuevo curso
                        </li>
                    </Link>
                </ul>
            </aside>
        </>
    )
}