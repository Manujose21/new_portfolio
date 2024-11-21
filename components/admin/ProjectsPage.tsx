"use client";
import { useState } from "react";
import { Modal } from "../shared/Modal";
import { Form } from "./Form";
import { createProyect, deleteProyect } from "@/actions";
import { Table } from "../shared/Table";
import { IoPencil, IoTrash } from "react-icons/io5";
import { Button } from "../shared/Button";
import { formatDate, shorthenText } from "@/utils/utils";

export const ProjectsPage = ({ technologies, projects }: { technologies: any[], projects: any[]}) => {

    const [ modal , setModal ] = useState(false);
    const [selectedProjectToDelete, setSelectedProjectToDelete] = useState('');

    const closeModal = () => {
        if(modal !== undefined) setModal(false);
    }
    

    const handleDeleteProyect = () => {

        deleteProyect(selectedProjectToDelete)
            .then((project) => {
                console.log(project);
                closeModal();
                window.location.reload();   
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (

        <>
            <Modal isModalOpen={modal} closeModal={closeModal}>
                <p>Seguro que quieres eliminar el proyecto?</p>
                <div className="flex justify-end gap-4 mt-4">
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button onClick={handleDeleteProyect}>Eliminar</Button>
                </div>
            </Modal>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Crear un nuevo proyecto en mi portafolio</h1>
                <div className="flex justify-center mt-4">
                    <Form 
                    formAction='proyects' 
                    fields={{
                        title: '',
                        description: '',
                        url: '',
                        image: null,
                        technologies: [],
                    }} 
                    action={createProyect}
                    technologies={technologies}
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Tabla de Proyectos</h1>

                    <Table 
                        headers={['Titulo del proyecto', 'Descripcion', 'Url', 'Imagen', 'Creado', 'Acciones']} 
                        >
                        
                        {
                        (projects.length > 0) ?
                        projects.map((project: any, index) => (
                            <tr key={index} className='border-b border-blue-gray-200'>
                            <td className='py-3 px-4'>
                                {project.title}
                            </td>
                            <td className='py-3 px-4'>
                                {shorthenText(project.description, 30)}
                            </td>
                            <td className="py-3 px-4">
                                {shorthenText(project.url, 20)}
                            </td>
                            <td className='py-3 px-4'>
                                { shorthenText( project.image, 25 )}
                            </td>
                            <td className='py-3 px-4'>
                               { formatDate(project.created_at) }
                            </td>

                            <td className='py-3 px-4 flex gap-4 justify-center'>
                                <IoPencil size={25} className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm'></IoPencil>
                                <IoTrash size={25} 
                                    className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm' color='#f05353' 
                                    onClick={() => {
                                        setModal(true);
                                        setSelectedProjectToDelete(project.id)
                                    }}></IoTrash>
                            </td>
                            </tr>
                        ))
                        : <tr>
                            <td className="py-3 px-4 text-center" colSpan={6}>No hay proyectos creados para mostrar</td>
                        </tr>
                        }
                    </Table>
                </div>
            </div>
        
        </>
    )
}