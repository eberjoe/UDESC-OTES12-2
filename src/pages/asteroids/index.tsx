/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { formatRelative, isBefore } from 'date-fns';
import { pt } from 'date-fns/locale';
import axios from 'axios';

import { AsteroidCard } from '../../components/asteroid-card';
import { AsteroidData } from '../../models';

export default function Asteroids() {
  const mountedRef = useRef(true);
  const [user, setUser] = useState();
  const [asteroids, setAsteroids] = useState<AsteroidData[]>(null);

  const router = useRouter();

  useEffect(() => {
    if (mountedRef) {
      axios.get('/api/read-user').then((res) => {
        setUser(res.data);
        axios.get('/api/fetch-asteroids').then((res) => {
          const now = new Date();
          const batch = res.data;
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
                    (asteroid.estimated_diameter.kilometers
                      .estimated_diameter_min +
                      asteroid.estimated_diameter.kilometers
                        .estimated_diameter_max) /
                    2,
                  isDangerous: asteroid.is_potentially_hazardous_asteroid
                }))
            );
          }
          tempAsteroids.sort((a, b) => a.passTime - b.passTime);
          setAsteroids(tempAsteroids);
        });
      });
    }
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleclick = async (id: string) => {
    console.log(`clicou em ${id}`);
    router.push('farewell');
  };

  return (
    <div className="container">
      {user && asteroids && (
        <>
          <div>
            <h1>{`${user}, agende sua viagem a bordo de um meteoro`}</h1>
          </div>
          <div className="asteroids-container">
            <ul>
              {asteroids.map((asteroid) => (
                <li key={asteroid.id}>
                  <AsteroidCard
                    {...asteroid}
                    handleclick={() => handleclick(asteroid.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
