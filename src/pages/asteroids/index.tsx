/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { formatRelative, isBefore } from 'date-fns';
import { pt } from 'date-fns/locale';
import axios from 'axios';

import { AsteroidCard } from '../../components/asteroid-card';
import { AsteroidData } from '../../models';
import { Globals } from '../../global-vars';

export default function Asteroids() {
  const mountedRef = useRef(true);
  const [user, setUser] = useState(null);
  const [asteroids, setAsteroids] = useState<AsteroidData[]>(null);

  const router = useRouter();

  const load = useCallback(async () => {
    if (mountedRef.current) {
      const user = await (
        await axios.get('/api/read-user', {
          params: { name: Globals['userName'] }
        })
      ).data;
      setUser(user);
      const batch = await (await axios.get('/api/fetch-asteroids')).data;
      const now = new Date();
      const tempAsteroids = [];
      for (const day in batch) {
        tempAsteroids.push(
          ...batch[day]
            .filter((asteroid: any) =>
              isBefore(
                now,
                new Date(
                  asteroid.close_approach_data[0].epoch_date_close_approach
                )
              )
            )
            .map((asteroid: any) => ({
              id: asteroid.id,
              name: asteroid.name,
              passTimeFormatted: formatRelative(
                new Date(
                  asteroid.close_approach_data[0].epoch_date_close_approach
                ),
                now,
                { locale: pt }
              ),
              passTime:
                asteroid.close_approach_data[0].epoch_date_close_approach,
              passDistance: `${Intl.NumberFormat('pt').format(
                asteroid.close_approach_data[0].miss_distance.kilometers
              )} km`,
              estDiameter:
                (asteroid.estimated_diameter.kilometers.estimated_diameter_min +
                  asteroid.estimated_diameter.kilometers
                    .estimated_diameter_max) /
                2,
              isDangerous: asteroid.is_potentially_hazardous_asteroid
            }))
        );
      }
      tempAsteroids.sort((a, b) => a.passTime - b.passTime);
      setAsteroids(tempAsteroids);
    }
  }, []);

  useEffect(() => {
    if (mountedRef.current) {
      load();
    }
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  const handleclick = async (id: string, passTime: number) => {
    await axios.post('/api/book-trip', {
      name: user.name,
      asteroid_id: id,
      departure_timestamp: new Date(passTime).toISOString()
    });
    router.push('farewell');
  };

  return (
    <div className="container">
      {user && asteroids && (
        <>
          <div>
            <h1>{`${user.name}, agende sua viagem a bordo de um meteoro`}</h1>
          </div>
          <div className="asteroids-container">
            <ul>
              {asteroids.map((asteroid) => (
                <li key={asteroid.id}>
                  <AsteroidCard
                    {...asteroid}
                    handleclick={() =>
                      handleclick(asteroid.id, asteroid.passTime)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <Link href="/">Voltar</Link>
    </div>
  );
}
