'use server';
import { prisma } from "@/prisma/prismaClient";

export const getTechnologies = async () => {
    const technologies = await prisma.technologies.findMany();
    return technologies;
}
  