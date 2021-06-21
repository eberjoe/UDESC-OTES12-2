import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const user = await prisma.user.findMany({ take: -1 });
  res.status(200).json(user[0].name);
};
