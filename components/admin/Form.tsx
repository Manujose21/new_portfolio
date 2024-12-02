'use client';
import {  useState } from "react";
import { Button } from '../shared/Button';
import { CardForm } from './CardForm';
import { ToastContainer, toast } from 'react-toastify'
import { CldUploadButton, CldImage, CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo } from 'next-cloudinary'  
import { useRouter } from "next/navigation";


interface Experience{
    id        : string,                   
    name      : string   
    created_at: Date               
}

interface Props {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fields: {[key:string]: any},
    formAction: "technologies" | "experiences" | "proyects" | "courses",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: (fields: {[key:string]: any}) =>  Promise<void>,
    technologies?: Experience[]
}
export const Form = ({ 
    fields,
    formAction,
    action,
    technologies
 }: Props) => {

    const [fieldsForm, setFields] = useState(fields);
    const [currentJob, setCurrentJob] = useState(false);
    

    const shortenText = (text: string) => {
        return text.length > 30 ? text.substring(0, 30) + '...' : text
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        action(fieldsForm)
            .then(() => {
                toast.success(`${formAction} created successfully`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setFields(() => ({...fieldsForm}))
                // refresh();
                window.location.reload();
            })
            .catch(() => {
                toast.error('Error, something not created', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }    


    const handleChangeTech = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setFields({ ...fieldsForm, technologies: newSelectedOptions });
    }

    const handleUploadImage = ( result: CloudinaryUploadWidgetResults ) => {

        console.log(result.info);

        if (result.info) {
            setFields((value) =>  ({
                ...value,
                image: (result.info as CloudinaryUploadWidgetInfo).secure_url,
                externalId: (result.info as CloudinaryUploadWidgetInfo).public_id
            }))
        }
    }

    if(formAction === "technologies") {
        return (

            <form onSubmit={handleSubmit}>
                <CardForm title="Crear tecnologia">
                    <div className="col-span-2 flex flex-col">
                        <label htmlFor="" className="text-sm">Nombre de tecnologia</label>
                        <input 
                            type="text"
                            required 
                            placeholder="Ingresa el nombre de la tecnologia"
                            className=" mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                            onChange={(e) => setFields({ ...fieldsForm, name: e.target.value })} 
                            />

                        <Button type="submit" className="mt-4 flex justify-center">Crear</Button>
                        <ToastContainer/>
                    </div>
                </CardForm>
            </form>
        )
    }

    if(formAction === "experiences") {
        return (

            <form onSubmit={handleSubmit}>
                <ToastContainer></ToastContainer>
                <CardForm title="Crear experiencia">
                    <div>    
                        <label htmlFor="">Titulo o Empresa</label>
                        <input
                            required 
                            type="text" 
                            placeholder="Ingresa el nombre de la empresa o el titulo"
                            className=" mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                            onChange={(e) => setFields({ ...fieldsForm, title: e.target.value })}

                        />
                    </div>
                    <div>
                        <label htmlFor="">Puesto de trabajo</label>
                        <input
                            required 
                            className=" mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                            type="text"
                            placeholder="Ingresa el nombre del puesto de trabajo"
                            onChange={(e) => setFields({ ...fieldsForm, job: e.target.value })}
                        />
                    </div>
                    <div>

                        <label htmlFor="">Describe tu trabajo</label>
                        <textarea 
                            name="description" 
                            id="description" 
                            placeholder="Ingresa una descripción de tu trabajo"
                            className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                            onChange={(e) => setFields({ ...fieldsForm, description: e.target.value })} cols={25} rows={5}
                            required
                        >
                        </textarea>
                    </div>

                    <div>
                        <label htmlFor="">Tecnologias que usaste</label>
                        <select 
                            className=' bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' 
                            required 
                            multiple 
                            onChange={handleChangeTech}>
                            {
                                technologies?.map((technology) => (
                                    <option key={technology.id} value={technology.id}>{technology.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Fecha de inicio</label>
                        <input
                            required 
                            type="date" 
                            className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                            placeholder="Ingresa la fecha"
                            max={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setFields({ ...fieldsForm, start: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Fecha de finalización</label>
                        {
                            (currentJob) 
                            ? <input required type="text" value={fieldsForm.end} disabled/>
                            : <input
                                required 
                                type="date" 
                                className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                                placeholder="Ingresa la fecha"
                                max={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setFields({ ...fieldsForm, end: e.target.value })}
                            />
                        }
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            id="current"
                            name="current"
                            type="checkbox" 
                            className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                            checked={currentJob}
                            onChange={() => { 
                                setCurrentJob(!currentJob)
                                setFields({ ...fieldsForm, end: 'actualmente' })
                            }}
                        />
                        <label htmlFor="current" className="text-sm">Actualmente</label>
                    </div>
                    <Button type="submit" className="mt-4 flex justify-center">Crear</Button>
                </CardForm>
            </form>
        )
    }

    if(formAction === "proyects") {
        return (

            <form onSubmit={handleSubmit}>
                <ToastContainer></ToastContainer>
                <CardForm title="Crear proyecto">
                    <div>
                        <label htmlFor="">Nombre del proyecto</label>
                        <input 
                            required
                            type="text" 
                            placeholder="Ingresa el nombre de la empresa o el titulo"
                            className=" mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                            onChange={(e) => setFields({ ...fieldsForm, title: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="">description</label>
                        <textarea
                            required
                            className=" mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                            placeholder="Ingresa la descripción del proyecto"
                            cols={27} rows={5}
                            onChange={(e) => setFields({ ...fieldsForm, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div>     
                        <label htmlFor="">Url del proyecto</label>
                        <input 
                            required
                            type="text" 
                            placeholder="Ingresa la ur de tu proyecto"
                            className=" mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                            onChange={(e) => setFields({ ...fieldsForm, url: e.target.value })}
                        />
                    </div>
                    <div>

                        <label htmlFor="">Tecnologias que usaste</label>
                        <select 
                            required 
                            name="" 
                            id="" 
                            className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            multiple
                            onChange={handleChangeTech}	
                        >
                            {
                                technologies?.map((technology) => (
                                    <option key={technology.id} value={technology.id}>{technology.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>    
                        <CldUploadButton  
                            options={ {maxFiles: 1 } }
                            onSuccess={handleUploadImage}
                            uploadPreset="portfolio"
                            className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                            
                        >
                            {
                                (fieldsForm.image !== null) 
                                ?  shortenText(fieldsForm.image)
                                : 'Subir imagen'
                            }
                        </CldUploadButton>

                        {
                            (fieldsForm.image) 
                            ? <CldImage 
                                src={fieldsForm.image}
                                alt="image"
                                width="500"
                                height="300"
                             ></CldImage>
                            : ''
                        }

                    </div>
                    <div className="col-span-2 flex">

                        <Button type="submit" className="mt-4 flex-1 flex justify-center">Crear</Button>
                    </div>

                </CardForm>
            </form>
        )
    }

    return (

        <>
            <form onSubmit={handleSubmit}>
                <ToastContainer/>
                <CardForm title="Crear curso">
                    <div>
                        <label htmlFor="">Nombre del curso</label>
                        <input 
                            required
                            type="text" 
                            placeholder="Ingresa el nombre del curso" 
                            value={fieldsForm.course}
                            className=" mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400" 
                            onChange={(e) => setFields({ ...fieldsForm, course: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Descripcion del curso</label>
                        <textarea
                            required
                            className=" mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                            placeholder="Ingresa la descripción del curso"
                            cols={27} rows={5}
                            value={fieldsForm.description}
                            onChange={(e) => setFields({ ...fieldsForm, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div>
                        <CldUploadButton  
                            options={ {maxFiles: 1 } }
                            onSuccess={handleUploadImage}
                            uploadPreset="portfolio"
                            className="mt-2 p-2 rounded-md border-[1.5px] border-background-primary focus:outline-none  focus:border-revolver-400"
                            
                        >
                            {
                                (fieldsForm.image !== null) 
                                ?  shortenText(fieldsForm.image)
                                : 'Subir imagen'
                            }
                        </CldUploadButton>

                        {
                            (fieldsForm.image) 
                            ? <CldImage                             
                                src={fieldsForm.image}
                                alt="image"
                                width="500"
                                height="300"
                                ></CldImage>
                            : ''
                        }

                    </div>
                    <div>
                        <label htmlFor="">fecha de finalización</label>
                        <input 
                            required
                            type="date" 
                            value={fieldsForm.date} 
                            onChange={(e) => setFields({ ...fieldsForm, date: e.target.value })}
                            max={new Date().toISOString().split("T")[0]}
                        />
                    </div>
                    <div className="col-span-2 flex">

                        <Button type="submit" className="mt-4 flex justify-center flex-1">Crear</Button>
                    </div>
                </CardForm>
            </form>

        </>
    )
}