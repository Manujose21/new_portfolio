"use client"
import { createExperience, deleteExperience } from "@/actions"
import { Table } from "../shared/Table"
import { Form } from "./Form"
import { IoPencil, IoTrash } from "react-icons/io5"
import { useState } from "react"
import { toast } from "react-toastify"
import { Modal } from "../shared/Modal"
import { Button } from "../shared/Button"

export const ExperiencePage = ( { technologies, experiences }: { technologies: any[], experiences: any[] }) => {

    const [ modal , setModal ] = useState(false);
    const [selectedExperienceToDelete, setSelectedExperienceToDelete] = useState('');

    const closeModal = () => {
        if(modal !== undefined) setModal(false);    
    }

    const handleDeleteExperience = () => {

        deleteExperience(selectedExperienceToDelete).then(() => { 
            closeModal();
            window.location.reload();
            
        }).catch((error) => {
            console.log(error);
            toast.error(`Error al eliminar la experiencia`, {
                position: "bottom-right",
                autoClose: 1000
            });
        })
        
    }

    return (
        <div className="mb-8">

            <Modal isModalOpen={modal} closeModal={closeModal}>
                <p>seguro que quieres eliminar la experiencia?</p>
                <div className="flex justify-end mt-2 gap-4">
                    <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteExperience}>Eliminar</Button>   
                    <Button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Cancelar</Button>
                </div>
            </Modal>
            <h1 className="text-2xl font-bold">Crear una nueva experiencia en mi portafolio</h1>
            <div className="flex justify-center mt-4">
                <Form 
                formAction='experiences' 
                    fields={{
                        title: '',
                        job: '',
                        description: '',
                        start: '',
                        end: '',
                        technologies: []
                    }}
                    action={createExperience} 
                    technologies={technologies}
                />
            </div>
            <div>
                <h1 className="text-2xl font-bold">Tabla de Experiencias</h1>
                <Table 
                    headers={['Empresa', 'Puesto de trabajo', 'Descripcion', 'Fecha de Inicio', 'Fecha de Fin', 'Acciones']} 
                    >
                    
                    {
                    (experiences.length > 0) ?
                    experiences.map((experience: any, index) => (
                        <tr key={index} className='border-b border-blue-gray-200'>
                        <td className='py-3 px-4'>
                            {experience.title}
                        </td>
                        <td className='py-3 px-4'>
                            {experience.job}
                        </td>
                        <td className='py-3 px-4'>
                            {experience.description}
                        </td>
                        <td className='py-3 px-4'>
                            {experience.start_date}
                        </td>
                        <td className='py-3 px-4'>
                            {experience.end_date}
                        </td>

                        <td className='py-3 px-4 flex gap-4 justify-center'>
                            <IoPencil 
                                size={25} 
                                className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm'
                            ></IoPencil>
                            <IoTrash 
                                size={25} 
                                className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm' 
                                color='#f05353'
                                onClick={() => {
                                    setModal(true);
                                    setSelectedExperienceToDelete(experience.id);
                                }}
                            ></IoTrash>
                        </td>
                        </tr>
                    ))
                    : <tr>
                        <td className="py-3 px-4 text-center" colSpan={6}>No hay experiencias creadas para mostrar</td>
                    </tr>
                    }
                </Table>
            </div>
        </div>
    )
}