"use client";
import { createTech, deleteTech, updateTech } from "@/actions";
import { Button } from "../shared/Button";
import { Modal } from "../shared/Modal";
import { Table } from "../shared/Table";
import { Form } from "./Form";
import { IoPencil, IoTrash } from "react-icons/io5";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
    technologies: any[],
}

export const TechnologiesPage = ({ technologies }: Props) => {

    const { refresh } = useRouter();

    const [ modal , setModal ] = useState(false);
    const [ modalEdit , setModalEdit ] = useState(false);
    const [selectedTechToDelete, setSelectedTechToDelete] = useState('');
    const [ selectedTechToEdit, setSelectedTechToEdit ] = useState({name: '', id: ''});

    const closeModal = () => {
        if(modal !== undefined) setModal(false);
    }
     const closeModalEdit = () => {
        if(modalEdit !== undefined) setModalEdit(false);
    }
    
    const handleDeleteTech = () => {

        deleteTech(selectedTechToDelete).then(() => { 
            closeModal();
            refresh();
            
        }).catch((error) => {
            console.log(error);
            toast.error(`Error al eliminar la tecnologia`, {
                position: "bottom-right",
                autoClose: 1000
            });
        })
        
    }

    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateTech(selectedTechToEdit.id, selectedTechToEdit.name).then(() => { 
            closeModalEdit();
            refresh();
            
        }).catch((error) => {
            console.log(error);
            toast.error(`Error al editar la tecnologia`, {
                position: "bottom-right",
                autoClose: 1000
            });
        })

    }
    
    return (
        <>
            <ToastContainer></ToastContainer>
            <Modal isModalOpen={modal} closeModal={closeModal}>
                <h2 className='text-xl mt-2'> Seguro que deseas eliminar esta tecnologia?</h2>
                <div className='flex justify-end gap-1'>
                    <Button onClick={handleDeleteTech}>Eliminar</Button>
                    <Button onClick={closeModal}>Cancelar</Button>
                </div>
            </Modal>

            <Modal isModalOpen={modalEdit} closeModal={closeModalEdit}>
                <h2 className='text-xl mt-2'>Editar Tecnologia</h2>  
                <form onSubmit={handleEdit}>
                    <input className="w-full mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" type="text" value={selectedTechToEdit.name} onChange={(e) => setSelectedTechToEdit({...selectedTechToEdit, name: e.target.value})} />
                    <div className='mt-4 flex justify-end gap-1'>
                        <Button type="button" onClick={closeModalEdit}>Cancelar</Button>
                        <Button type="submit">Actualizar</Button>
                    </div>
                </form>  
            </Modal>

            <div className="mb-8">
                <h1 className="text-2xl font-bold">Crear una nueva tenologia en mi portafolio</h1>
                <div className="flex justify-center mt-16">
                    <Form formAction='technologies' fields={{name: ''}} action={createTech}/>
                </div>

                <div>
                    <h1 className="text-2xl font-bold">Tabla de Tecnologias</h1>
                    <Table 
                        headers={["#","Tecnologia", "Acciones"]} 
                        >
                        
                        {
                        (technologies.length > 0) ?
                        technologies.map((tech: any, index) => (
                            <tr key={index} className='border-b border-blue-gray-200'>
                            <td className='py-3 px-4'>{index + 1}</td>
                            <td className='py-3 px-4'>
                                {tech.name}
                            </td>
                            <td className='py-3 px-4 flex'>
                                <IoPencil 
                                    size={25} 
                                    className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm mx-2'
                                    onClick={() => {
                                        setSelectedTechToEdit(tech)
                                        setModalEdit(true)
                                    }}
                                >
                                </IoPencil>
                                <IoTrash 
                                    size={25} 
                                    className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm ' 
                                    color='#f05353'
                                    onClick={() => {
                                        setSelectedTechToDelete(tech.id)
                                        setModal(true)
                                    }}
                                >
                                </IoTrash>
                            </td>
                            </tr>
                        ))
                        : <tr>
                            <td className="py-3 px-4 text-center" colSpan={6}>No hay tecnologias creadas para mostrar</td>
                        </tr>
                        }
                    </Table>
                </div>
            </div>
            
        </>
    )
}