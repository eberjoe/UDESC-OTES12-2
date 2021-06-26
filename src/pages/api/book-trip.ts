import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const bdResponse = await prisma.user.update({
    where: {
      name: req.body.name
    },
    data: {
      asteroid_id: req.body.asteroid_id,
      departure_timestamp: req.body.departure_timestamp
    }
  });
  res.status(200).json(bdResponse);
};
