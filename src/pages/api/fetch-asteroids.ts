import axios from 'axios';
import { NextApiResponse } from 'next';

export default async (req: never, res: NextApiResponse<unknown>) => {
  const nasaResponse = await (
    await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: { api_key: process.env.NASA_API_KEY }
    })
  ).data.near_earth_objects;
  res.status(200).json(nasaResponse);
};
