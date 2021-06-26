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
  const [asteroids, setAsteroids] = useState<AsteroidData[]>(null);

  const router = useRouter();

  const load = useCallback(async () => {
    if (mountedRef.current) {
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
    if (Globals['userName']) {
      await axios.post('/api/book-trip', {
        name: Globals['userName'],
        asteroid_id: id,
        departure_timestamp: new Date(passTime).toISOString()
      });
    }
    router.push('farewell');
  };

  return (
    <div className="container">
      {asteroids ? (
        <>
          <div>
            <h1>{`${Globals['userName']}, agende sua viagem a bordo de um meteoro`}</h1>
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
          <Link href="/">Voltar</Link>
        </>
      ) : (
        <div>
          <h1>Carregando dados...</h1>
        </div>
      )}
    </div>
  );
}
