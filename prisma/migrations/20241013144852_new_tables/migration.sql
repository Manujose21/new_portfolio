-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "job" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technologies" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "experienceId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Technologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience_Technologies" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "technologiesId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_Technologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" TEXT NOT NULL,
    "course" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "certificate" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Experience_Technologies" ADD CONSTRAINT "Experience_Technologies_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience_Technologies" ADD CONSTRAINT "Experience_Technologies_technologiesId_fkey" FOREIGN KEY ("technologiesId") REFERENCES "Technologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
