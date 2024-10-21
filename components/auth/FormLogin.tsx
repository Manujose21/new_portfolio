'use client';
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../shared/Button";
import {  setCookie  } from 'cookies-next'
import { ToastContainer,toast } from "react-toastify";

export const FormLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        const isLoged = await login(email, password);
        if (!isLoged) {
            toast.error('Error credenciales incorrectas', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }

        toast.success(`Bienvenio, ${isLoged.name} `, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });;
        setCookie('token', isLoged.token)
        router.push('/admin')
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            <form onSubmit={ handleSubmit  } className="flex flex-col gap-4 p-6 rounded-lg bg-background-light dark:bg-background-secondary shadow-md min-w-96">
                <label htmlFor="email">Email</label>
                <input  
                    type="email" 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    id="email" 
                    name="email" 
                    placeholder="JhH7Z@example.com" 
                    autoComplete='off' 
                    className='p-2 dark:bg-background-secondary'
                    required
                />
                <label htmlFor="password">Contaraseña</label>   
                <input  
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder='********' 
                    className='p-2 dark:bg-background-secondary'
                    required
                />
                <Button type='submit' className='flex items-center justify-center dark:border-x-background-light-secondary '>Ingresar</Button>
            </form>
        </>
    )
}