"use client"
import { IoPencil, IoTrash } from "react-icons/io5";
import { Table } from "../shared/Table";
import { Form } from "./Form";
import { createCourse, deleteCourse } from "@/actions";
import { Modal } from "../shared/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shared/Button";

export default function CoursePage( { courses }: { courses: any[] } ) {
   
    const [ modal , setModal ] = useState(false);
    const [selectedCourseToDelete, setSelectedCourseToDelete] = useState('');

    const closeModal = () => {
        if(modal !== undefined) setModal(false);
    }

    const handleDeleteCourse = () => {

        deleteCourse(selectedCourseToDelete).then(() => { 
            closeModal();
            window.location.reload();
            
        }).catch((error) => {
            console.log(error);
            toast.error(`Error al eliminar el curso`, {
                position: "bottom-right",
                autoClose: 1000
            });
        })
        
    }

    return (
        <>
            <Modal isModalOpen={modal} closeModal={closeModal}>
                <p>seguro que quieres eliminar el curso</p>
                <div className='flex justify-end mt-2 gap-4'>
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button onClick={handleDeleteCourse}>Eliminar</Button>
                </div>
            </Modal>
            <div>
                <h1 className="text-2xl font-bold">Crear un nuevo curso en mi portafolio</h1>
                <div className='flex justify-center mt-4'>
                    <Form 
                        fields={{
                            course: '',
                            description: '',
                            image: null,
                            date: '',
                        }}
                        formAction='courses'
                        action={createCourse} 
                    />
                </div>

                <div>
                    <h1 className='text-2xl font-bold'>Tabla de cursos</h1>
                    <Table 
                        headers={['Curso', 'Descripcion', 'Certificado', 'Fecha', 'Acciones']} 
                    >
                        
                        {
                        courses.map((course: any, index) => (
                            <tr key={index} className='border-b border-blue-gray-200'>
                            <td className='py-3 px-4'>
                                {course.course}
                            </td>
                            <td className='py-3 px-4'>
                                {course.description}
                            </td>
                            <td className='py-3 px-4'>
                                {course.image}
                            </td>
                            <td className='py-3 px-4'>
                                {course.date}
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
                                        setSelectedCourseToDelete(course.id)
                                    }}
                                ></IoTrash>
                            </td>
                            </tr>
                        ))
                        }
                    </Table>
                </div>
            </div>
        </>
    )
}