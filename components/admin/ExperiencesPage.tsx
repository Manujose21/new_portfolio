"use client"
import { shorthenText } from "@/utils/utils"
import { createExperience, deleteExperience, updateExperience } from "@/actions"
import { Table } from "../shared/Table"
import { Form } from "./Form"
import { IoPencil, IoTrash } from "react-icons/io5"
import { useState } from "react"
import { toast } from "react-toastify"
import { Modal } from "../shared/Modal"
import { Button } from "../shared/Button"
import { useRouter } from "next/navigation"
import { Experience, Technologies } from "@/interfaces/types"

interface Props {
    technologies: Technologies[]
    experiences: Experience[]
}

export const ExperiencePage = ( { technologies, experiences }: Props) => {

    const { refresh } = useRouter();
    
    const [ modal , setModal ] = useState(false);
    const [ modalEdit , setModalEdit ] = useState(false);
    const [selectedExperienceToEdit, setSelectedExperienceToEdit] = useState<Experience>({  
        id: '',
        title: '',
        job: '',
        description: '',
        start_date: '',
        end_date: '',
        technologies: [],
    });

    const [ experienceFinish, setExperienceFinish ] = useState(false);

    const [selectedExperienceToDelete, setSelectedExperienceToDelete] = useState('');

    const closeModal = () => {
        if(modal !== undefined) setModal(false);    
    }

    const closeModalEdit = () => {
        if(modalEdit !== undefined) setModalEdit(false);
    }
    const handleDeleteExperience = () => {

        deleteExperience(selectedExperienceToDelete).then(() => { 
            closeModal();
            refresh();
            
        }).catch((error) => {
            console.log(error);
            toast.error(`Error al eliminar la experiencia`, {
                position: "bottom-right",
                autoClose: 1000
            });
        })
        
    }

    const handleEditExperience = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateExperience({
            id: selectedExperienceToEdit.id,
            title: selectedExperienceToEdit.title,
            job: selectedExperienceToEdit.job,
            description: selectedExperienceToEdit.description,
            start: selectedExperienceToEdit.start_date,
            end: selectedExperienceToEdit.end_date,
        }).then(() => { 
            closeModalEdit();
            refresh();
            
        }).catch((error) => {
            console.log(error);
            toast.error(`Error al editar la experiencia`, {
                position: "bottom-right",
                autoClose: 1000
            });
        })

        setModalEdit(false);
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

            <Modal isModalOpen={modalEdit} closeModal={closeModalEdit}>
                <form
                    onSubmit={handleEditExperience} 
                    className="mt-4 flex flex-col gap-4"
                >
                    <input type="text" 
                        onChange={ (e) =>  setSelectedExperienceToEdit({ ...selectedExperienceToEdit, title: e.target.value }) }
                        value={selectedExperienceToEdit.title}
                        className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                    />

                    <input type="text" 
                        onChange={ (e) =>  setSelectedExperienceToEdit({ ...selectedExperienceToEdit, job: e.target.value }) }
                        value={selectedExperienceToEdit.job}
                        className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                    />

                    <textarea
                        onChange={ (e) =>  setSelectedExperienceToEdit({ ...selectedExperienceToEdit, description: e.target.value }) }
                        value={selectedExperienceToEdit.description} 
                        className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400">

                    </textarea>

                    <input type="date" 
                        onChange={ (e) =>  setSelectedExperienceToEdit({ ...selectedExperienceToEdit, start_date: e.target.value }) }
                        value={selectedExperienceToEdit.start_date}
                        className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                    />

                    {
                        (selectedExperienceToEdit.end_date === "actualmente") ?
                        (
                            <>
                                {
                                    (experienceFinish) ?
                                    (
                                        <input 
                                            type="date" 
                                            value={selectedExperienceToEdit.end_date}
                                            onChange={ (e) =>  setSelectedExperienceToEdit({ ...selectedExperienceToEdit, end_date: e.target.value }) }
                                            className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"    
                                        ></input>  
                                    )
                                    :
                                    (
                                        <input 
                                            type="text" 
                                            value={selectedExperienceToEdit.end_date}
                                            disabled
                                            
                                            className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"    
                                        ></input>  
                                        
                                    )
                                }
                                <div className="flex items-center gap-4">
                                    <label htmlFor="" className="text-sm">Finalizo tu experiencia?</label>
                                    <input type="checkbox" onChange={() => setExperienceFinish(!experienceFinish)} className="mt-2" />
                                </div>
                                
                            </>
                        ) :
                        (    
                            <input 
                                type="date" 
                                onChange={ (e) =>  setSelectedExperienceToEdit({ ...selectedExperienceToEdit, end_date: e.target.value }) }
                                value={selectedExperienceToEdit.end_date}
                                className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                            ></input>
                        )
                    }
                    <div className="flex justify-end gap-4">
                        <Button type="button" onClick={closeModalEdit}>Cancelar</Button>
                        <Button type="submit">Actualizar</Button>
                    </div>
                </form>
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
                    experiences.map((experience: Experience, index) => (
                        <tr key={index} className='border-b border-blue-gray-200'>
                        <td className='py-3 px-4'>
                            {experience.title}
                        </td>
                        <td className='py-3 px-4'>
                            {experience.job}
                        </td>
                        <td className='py-3 px-4'>
                            {shorthenText(experience.description, 30)}
                        </td>
                        <td className='py-3 px-4'>
                            {experience.start_date}
                        </td>
                        <td className='py-3 px-4'>
                            {experience.end_date}
                        </td>

                        <td className='py-3 px-4 flex gap-4 justify-center'>
                            <IoPencil 
                                onClick={() => {
                                    setModalEdit(true)
                                    setSelectedExperienceToEdit(experience);
                                }}
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