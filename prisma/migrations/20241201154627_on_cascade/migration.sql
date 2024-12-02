-- DropForeignKey
ALTER TABLE "Experience_Technologies" DROP CONSTRAINT "Experience_Technologies_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "Experience_Technologies" DROP CONSTRAINT "Experience_Technologies_technologiesId_fkey";

-- DropForeignKey
ALTER TABLE "Images_Courses" DROP CONSTRAINT "Images_Courses_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Images_Proyects" DROP CONSTRAINT "Images_Proyects_proyect_id_fkey";

-- DropForeignKey
ALTER TABLE "Proyects_Technologies" DROP CONSTRAINT "Proyects_Technologies_proyectId_fkey";

-- DropForeignKey
ALTER TABLE "Proyects_Technologies" DROP CONSTRAINT "Proyects_Technologies_technologiesId_fkey";

-- AddForeignKey
ALTER TABLE "Experience_Technologies" ADD CONSTRAINT "Experience_Technologies_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience_Technologies" ADD CONSTRAINT "Experience_Technologies_technologiesId_fkey" FOREIGN KEY ("technologiesId") REFERENCES "Technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyects_Technologies" ADD CONSTRAINT "Proyects_Technologies_proyectId_fkey" FOREIGN KEY ("proyectId") REFERENCES "Proyects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyects_Technologies" ADD CONSTRAINT "Proyects_Technologies_technologiesId_fkey" FOREIGN KEY ("technologiesId") REFERENCES "Technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images_Courses" ADD CONSTRAINT "Images_Courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images_Proyects" ADD CONSTRAINT "Images_Proyects_proyect_id_fkey" FOREIGN KEY ("proyect_id") REFERENCES "Proyects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
