import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
  const { name } = req.query as { name: string };
  const user = await prisma.user.findUnique({
    where: { name: name }
  });
  res.status(200).json(user.name);
};
