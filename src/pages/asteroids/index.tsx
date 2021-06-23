import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { AsteroidCard } from '../../components/asteroid-card';
import { AsteroidData } from '../../models';

export default function Asteroids() {
  const mountedRef = useRef(true);
  const [user, setUser] = useState();
  const [asteroids, setAsteroids] = useState<AsteroidData[]>(null);

  const router = useRouter();

  useEffect(() => {
    if (mountedRef.current) {
      axios.get('/api/read-user').then((res) => {
        setUser(res.data);
        axios.get('/api/fetch-asteroids').then((res) => {
          setAsteroids(
            res.data[
              new Date(new Date().toUTCString()).toISOString().split('T')[0]
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ].map((asteroid: any) => ({
              id: asteroid.id,
              name: asteroid.name,
              passTime:
                asteroid.close_approach_data[0].close_approach_date_full
                  .split(' ')
                  .slice(-1)[0] + ' UTC',
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
            <h1>{`${user}, escolha seu meteoro do dia`}</h1>
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
