import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const r = await prisma.user.create({ data: { name: req.body.name } });
  res.status(200).json(r);
};
