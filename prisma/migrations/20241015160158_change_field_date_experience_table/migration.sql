/*
  Warnings:

  - You are about to drop the column `date` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "date",
ADD COLUMN     "end_date" TEXT NOT NULL,
ADD COLUMN     "start_date" TEXT NOT NULL;
