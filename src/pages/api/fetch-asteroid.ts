import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  const { asteroid_id } = req.query as { asteroid_id: string };
  const nasaResponse = await (
    await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteroid_id}`, {
      params: { api_key: process.env.NASA_API_KEY }
    })
  ).data;
  res.status(200).json(nasaResponse);
};
