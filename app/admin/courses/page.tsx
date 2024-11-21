import { createCourse } from '@/actions';
import { Form } from '../../../components/admin/Form';
import { Table } from '../../../components/shared/Table';
import { IoPencil, IoTrash } from 'react-icons/io5';
import { getCourses } from "@/actions"
import CoursePage from '@/components/admin/CoursesPage';

export default async function CoursesPage() {

  const courses = await getCourses();
  console.log(courses);

    return (
      <>
        <CoursePage courses={courses} />
      </>
    );
  }