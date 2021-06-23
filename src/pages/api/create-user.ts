import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const bdResponse = await prisma.user.create({
    data: { name: req.body.name }
  });
  res.status(200).json(bdResponse);
};
