"use client";
import { useState } from "react";
import { Modal } from "../shared/Modal";
import { Form } from "./Form";
import { createProyect, deleteProyect, updateProyect } from "@/actions";
import { Table } from "../shared/Table";
import { IoPencil, IoTrash } from "react-icons/io5";
import { Button } from "../shared/Button";
import { formatDate, shorthenText } from "@/utils/utils";
import { CldImage, CldUploadButton, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { deleteImage } from "@/actions/cloudinary.actions";
import { useRouter } from "next/navigation";
import { Project, Technologies } from "@/interfaces/types";


interface Props {
    technologies: Technologies[];
    projects: Project[]
}
export const ProjectsPage = ({ technologies, projects }: Props) => {

    const { refresh } = useRouter();

    const [ modal , setModal ] = useState(false);
    const [ modalEdit , setModalEdit ] = useState(false);
    const [selectedProjectToEdit, setSelectedProjectToEdit] = useState<Project>({
        id: '',
        title: '',
        description: '',
        url: '',
        technologies: [],
        images: [],
        created_at : new Date()
    });

    const [newImage, setNewImage] = useState(true);
    const [selectedProjectToDelete, setSelectedProjectToDelete] = useState('');

    const closeModal = () => {
        if(modal !== undefined) setModal(false);
    }
    
    const closeModalEdit = () => {
        if(modalEdit !== undefined) setModalEdit(false);
    }

    const handleDeleteProyect = () => {

        deleteProyect(selectedProjectToDelete)
            .then((project) => {
                console.log(project);
                closeModal();
                refresh();  
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        updateProyect({
            id: selectedProjectToEdit.id,
            title: selectedProjectToEdit.title,
            description: selectedProjectToEdit.description,
            url: selectedProjectToEdit.url,           
            images: selectedProjectToEdit.images
        }).then(() => {
            closeModalEdit();
            refresh();
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleUploadImage = ( result: CloudinaryUploadWidgetResults ) => {

        
        if (result.info) {
            const newImage = {
                  url: (result.info as CloudinaryUploadWidgetInfo).secure_url,
                  external_id: (result.info as CloudinaryUploadWidgetInfo).public_id,
                  id: selectedProjectToEdit.images[0].id
            };

            setSelectedProjectToEdit((value) =>  {

                const images = value.images = [{...newImage}];

                return {
                    ...value,
                    images 
                }
            })
        }
        console.log(selectedProjectToEdit.images);
        setNewImage(true);
    }
    
    const deleteImageFromCloudinary = async () => {
        console.log("hi");
        const imageDeleted = await deleteImage(selectedProjectToEdit.images[0].external_id)
        if(imageDeleted.result !== "ok") return
        console.log(imageDeleted);
        setNewImage(false);
    }

    console.log(projects);

    return (

        <>
            <Modal isModalOpen={modal} closeModal={closeModal}>
                <p>Seguro que quieres eliminar el proyecto?</p>
                <div className="flex justify-end gap-4 mt-4">
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button onClick={handleDeleteProyect}>Eliminar</Button>
                </div>
            </Modal>
            <Modal isModalOpen={modalEdit} closeModal={closeModalEdit}>
                <div>
                    <form className="mt-4" onSubmit={handleSubmitEdit}>
                        <input 
                            className="w-full mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                            type="text" 
                            onChange={ (e) => setSelectedProjectToEdit({...selectedProjectToEdit, title: e.target.value}) } 
                            value={selectedProjectToEdit.title}
                        />

                        <textarea 
                            className="w-full mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                            value={selectedProjectToEdit.description}
                            onChange={ (e) => setSelectedProjectToEdit({...selectedProjectToEdit, description: e.target.value}) } 
                        ></textarea>

                        <input 
                            type="text" 
                            className="w-full mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                            value={selectedProjectToEdit.url}
                            onChange={ (e) => setSelectedProjectToEdit({...selectedProjectToEdit, url: e.target.value}) }
                            
                        />

                        <div className='relative'>
                            {
                                newImage 
                                ? (
                                    <>
                                        { selectedProjectToEdit.images && selectedProjectToEdit.images.length > 0 && (
                                            <div>
                                                <CldImage src={selectedProjectToEdit.images[0].url} alt="image" width={500} height={300}></CldImage>
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
                                            ?  shorthenText(selectedProjectToEdit.images[0].url, 70)
                                            : 'Editar imagen'
                                        }
                                    </CldUploadButton>
                            }
                            
                        </div>

                        <div className="flex justify-end">
                            <Button type="button" onClick={closeModalEdit}>Cancelar</Button>
                            <Button type="submit" >Actualizar</Button>
                        </div>

                    </form>
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
                        projects.map((project: Project, index) => (
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
                                imagen.jpg
                            </td>
                            <td className='py-3 px-4'>
                               { formatDate(project.created_at) }
                            </td>

                            <td className='py-3 px-4 flex gap-4 justify-center'>
                                <IoPencil 
                                    size={25} 
                                    className='cursor-pointer hover:bg-background-light-secondary p-1 rounded-sm'
                                    onClick={() => {
                                        setModalEdit(true);
                                        setSelectedProjectToEdit(project)
                                    }}    
                                ></IoPencil>
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