import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const userExists = await prisma.admin.findUnique({ 
    where: { email: process.env.ADMIN_EMAIL },
   });

  if (!userExists) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);

    await prisma.admin.create({
      data: {
        name: process.env.ADMIN_NAME!,
        email: process.env.ADMIN_EMAIL!,
        password: hashedPassword,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
