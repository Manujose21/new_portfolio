/*
  Warnings:

  - You are about to drop the column `image` on the `Proyects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Proyects" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "Images_Courses" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "external_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "Images_Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images_Proyects" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "external_id" TEXT NOT NULL,
    "proyect_id" TEXT NOT NULL,

    CONSTRAINT "Images_Proyects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images_Courses" ADD CONSTRAINT "Images_Courses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images_Proyects" ADD CONSTRAINT "Images_Proyects_proyect_id_fkey" FOREIGN KEY ("proyect_id") REFERENCES "Proyects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
