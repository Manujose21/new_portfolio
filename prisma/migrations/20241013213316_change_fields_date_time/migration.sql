-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Experience_Technologies" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Proyects" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Technologies" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;
