import { PrismaClient } from '@prisma/client';
import { NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: never, res: NextApiResponse<string>) => {
  const user = await prisma.user.findMany({ take: -1 });
  res.status(200).json(user[0].name);
};
