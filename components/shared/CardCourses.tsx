import { Course } from "@/interfaces/types"

interface Props {
    course: Course
}
export const CardCourses = ({ course }: Props) => {
    return (
        <>
            <div>
                <div className="relative grid h-[25rem] items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
                    <img src={ course.images[0].url } className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-background-primary to-transparent opacity-90"></div>
                    
                    <div className="relative p-6 px-6 py-14 md:px-12 text-color-text-primary">
                        <h3 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                            { course.course }
                        </h3>
                        <p className="block font-sans text-base font-light leading-relaxed text-white antialiased">
                            
                            finalizado el { course.date }
                        </p>
                    </div>
                </div>  
            </div>
        </>
    )
}