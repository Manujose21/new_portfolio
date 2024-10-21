-- CreateTable
CREATE TABLE "Proyects" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "technologies" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proyects_pkey" PRIMARY KEY ("id")
);
