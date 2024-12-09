import { IoBookOutline } from "react-icons/io5"
import { CardCourses } from "./CardCourses"
import { Course } from "@/interfaces/types"

interface Props {
    courses: Course[]
}
export  const CoursesSection = ({ courses }: Props) => {
    return (
        <section className="flex flex-col gap-4  mt-8 md:mt-32" id="courses">
            <div className=' flex gap-4'>
                <IoBookOutline size={35}/>
                <h1 className="text-2xl font-semibold">Mis Cursos</h1>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                {
                    courses.map((course, index) => (
                        <CardCourses course={course} key={index} />
                    ))
                }
            </div>
        </section>
    )
}