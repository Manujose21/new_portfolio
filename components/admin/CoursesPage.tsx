"use client"
import { IoPencil, IoTrash } from "react-icons/io5";
import { Table } from "../shared/Table";
import { Form } from "./Form";
import { createCourse, deleteCourse, updateCourse } from "@/actions";
import { Modal } from "../shared/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shared/Button";
import { shorthenText } from "@/utils/utils";
import { deleteImage } from "@/actions/cloudinary.actions";
import { CldImage, CldUploadButton, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { Course } from "@/interfaces/types";



interface Props {
    courses: Course[];
}

export default function CoursePage( { courses }: Props) {
   
    const { refresh } = useRouter();

    const [ modal , setModal ] = useState(false);
    const [ modalEdit , setModalEdit ] = useState(false);
    const [ newImage, setNewImage ] = useState(true);

    const [selectedCourseToEdit, setSelectedCourseToEdit] = useState<Course>({
        id: '',
        course: '',
        description: '',
        certificate: '',
        date: '',
        images: [],
      });
    const [selectedCourseToDelete, setSelectedCourseToDelete] = useState('');

    const closeModal = () => {
        if(modal !== undefined) setModal(false);
    }
    const closeModalEdit = () => {
        if(modalEdit !== undefined) setModalEdit(false);
    }

    const handleEditCourse = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        updateCourse(
            {
                id: selectedCourseToEdit.id,
                course: selectedCourseToEdit.course,
                description: selectedCourseToEdit.description,
                certificate: selectedCourseToEdit.certificate,
                date: selectedCourseToEdit.date,
                images: selectedCourseToEdit.images
            }
        ).then(() => {
            closeModalEdit();
            refresh();
        }).catch((error) => {
            console.log(error);
            toast.error(`Error al editar el curso`, {
                position: "bottom-right",
                autoClose: 1000
            });
        })
    }

    const handleDeleteCourse = () => {
       

        deleteCourse(selectedCourseToDelete).then(() => { 
            closeModal();
            refresh();
            
        }).catch((error) => {
            console.log(error);
            toast.error(`Error al eliminar el curso`, {
                position: "bottom-right",
                autoClose: 1000
            });
        })
        
    }

    const handleUploadImage = ( result: CloudinaryUploadWidgetResults ) => {

        
        if (result.info) {
            const newImage = {
                  url: (result.info as CloudinaryUploadWidgetInfo).secure_url,
                  external_id: (result.info as CloudinaryUploadWidgetInfo).public_id,
                  id: selectedCourseToEdit.images[0].id
            };

            setSelectedCourseToEdit((value) =>  {

                const images = value.images = [{...newImage}];

                return {
                    ...value,
                    images 
                }
            })
        }
        console.log(selectedCourseToEdit.images);
        setNewImage(true);
    }
    const deleteImageFromCloudinary = async () => {
        console.log("hi");
        const imageDeleted = await deleteImage(selectedCourseToEdit.images[0].external_id)
        if(imageDeleted.result !== "ok") return
        console.log(imageDeleted);
        setNewImage(false);
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
            <Modal isModalOpen={modalEdit} closeModal={closeModalEdit}>
                <p>Editar curso</p>
                <form onSubmit={handleEditCourse} className='flex flex-col'>

                    <input 
                        className="w-full mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                        type="text" 
                        value={selectedCourseToEdit.course}
                        onChange={(e) => setSelectedCourseToEdit({...selectedCourseToEdit, course: e.target.value})}
                    />
                    <textarea 
                        className="w-full mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                        value={selectedCourseToEdit.description}
                        onChange={(e) => setSelectedCourseToEdit({...selectedCourseToEdit, description: e.target.value})}    
                    />

                    <div className='relative'>
                        {
                            newImage 
                            ? (
                                <>
                                    { selectedCourseToEdit.images && selectedCourseToEdit.images.length > 0 && (
                                        <div>
                                            <CldImage src={selectedCourseToEdit.images[0].url} alt="image" width={500} height={300}></CldImage>
                                            <Button type='button' onClick={deleteImageFromCloudinary}>
                                                <IoTrash size={20} />
                                                Eliminar imagen
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )
                            :  <CldUploadButton  
                                    options={ {maxFiles: 1 } }
                                    onSuccess={handleUploadImage}
                                    uploadPreset="portfolio"
                                    className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                                        
                                >
                                    {
                                        (newImage) 
                                        ?  shorthenText(selectedCourseToEdit.images[0].url, 70)
                                        : 'Editar imagen'
                                    }
                                </CldUploadButton>
                        }
                        
                    </div>

                    
                    
                    {/* <input type="text" /> */}

                    <div className='flex justify-end mt-2 gap-4'>
                        <Button type ='button' onClick={closeModalEdit}>Cancelar</Button>
                        <Button type='submit'>Actualizar</Button>
                    </div>
                </form>
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
                        courses.map((course: Course, index) => (
                            <tr key={index} className='border-b border-blue-gray-200'>
                            <td className='py-3 px-4'>
                                {course.course}
                            </td>
                            <td className='py-3 px-4'>
                                {course.description}
                            </td>
                            <td className='py-3 px-4'>
                                {shorthenText(course.certificate, 20)}
                            </td>
                            <td className='py-3 px-4'>
                                {course.date}
                            </td>
                            <td className='py-3 px-4 flex gap-4 justify-center'>
                                <IoPencil 
                                    size={25} 
                                    className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm'
                                    onClick={ () => {
                                        setModalEdit(true);
                                        setSelectedCourseToEdit({
                                            id: course.id,
                                            course: course.course,
                                            description: course.description,
                                            certificate: course.certificate,
                                            date: course.date,
                                            images: course.images
                                        })
                                    }}
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