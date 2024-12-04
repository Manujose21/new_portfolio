"use server"
import { getCourses } from "@/actions"
import CoursePage from '@/components/admin/CoursesPage';
export default async function CoursesPage() {

  const courses = await getCourses();


    return (
      <>
        <CoursePage courses={courses} />
      </>
    );
  }