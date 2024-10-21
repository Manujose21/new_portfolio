/*
  Warnings:

  - You are about to drop the column `technologies` on the `Proyects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Proyects" DROP COLUMN "technologies";

-- CreateTable
CREATE TABLE "Proyects_Technologies" (
    "id" TEXT NOT NULL,
    "proyectId" TEXT NOT NULL,
    "technologiesId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proyects_Technologies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proyects_Technologies" ADD CONSTRAINT "Proyects_Technologies_proyectId_fkey" FOREIGN KEY ("proyectId") REFERENCES "Proyects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyects_Technologies" ADD CONSTRAINT "Proyects_Technologies_technologiesId_fkey" FOREIGN KEY ("technologiesId") REFERENCES "Technologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
