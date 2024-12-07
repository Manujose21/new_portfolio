"use client"
import {  IoClose } from 'react-icons/io5'
export const Modal = ({ children, isModalOpen, closeModal }: { children: React.ReactNode, isModalOpen: boolean, closeModal:() => void}) => {

    
    return (
        <div className={`fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-background-primary bg-opacity-30 flex items-center justify-center z-50 ${isModalOpen ? 'scale-100' : 'scale-0'} transition-all duration-150 ease-in-out`}>
            <div className="bg-background-light relative rounded-lg p-4 w-full max-w-2xl">
                <button className="absolute top-4 right-4 text-2xl text-white" onClick={closeModal}>
                    <IoClose />
                </button>
                {children}
            </div>
        </div>
    )
}