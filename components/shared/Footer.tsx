'use client'

import { usePathname } from "next/navigation";

export const Footer = () => {

    const path = usePathname()
    return (
        <>
            {
                (path !== "/admin" && path !== "/admin/proyects" && path !== "/admin/experiences" && path !== "/admin/technologies" && path !== "/admin/courses")
                ? 
                <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded ">
                    <div className="flex items-center justify-center">
                        <p className="font-semibold">Manuel Urdaneta portafolio © { new Date().getFullYear() } </p>
                    </div>
                </footer>
                : ''
            }

        </>
    );
};