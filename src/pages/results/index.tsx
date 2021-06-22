import { AbcdLandMap, City } from '../../globals/consts';
import { TimeLengthCalculator } from '../../components/time-length-calculator';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { AsteroidCard } from '../../components/asteroid-card';

export default function Home() {
  const mountedRef = useRef(true);
  const [user, setUser] = useState();
  const [asteroids, setAsteroids] = useState(null);

  useEffect(() => {
    if (mountedRef.current) {
      axios.get('/api/read-user').then((res) => setUser(res.data));
      axios
        .get('https://api.nasa.gov/neo/rest/v1/feed', {
          params: { api_key: process.env.NEXT_PUBLIC_NASA_API_KEY }
        })
        .then((res) => setAsteroids(res.data.near_earth_objects));
    }
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className="container">
      {user && (
        <div>
          <h1>{`${user} faz o percurso ${AbcdLandMap[City.A].name} - ${
            AbcdLandMap[City.B].name
          } - ${AbcdLandMap[City.C].name} - ${
            AbcdLandMap[City.D].name
          } em ${Intl.NumberFormat('pt').format(
            TimeLengthCalculator({
              pointA: AbcdLandMap[City.A].position,
              pointB: AbcdLandMap[City.B].position,
              speed: 24
            }) +
              TimeLengthCalculator({
                pointA: AbcdLandMap[City.B].position,
                pointB: AbcdLandMap[City.C].position,
                speed: 30
              }) +
              TimeLengthCalculator({
                pointA: AbcdLandMap[City.C].position,
                pointB: AbcdLandMap[City.D].position,
                speed: 30
              })
          )} wors`}</h1>
        </div>
      )}
      {asteroids && (
        <div className="asteroids-container">
          <ul>
            {asteroids[new Date().toISOString().split('T')[0]].map(
              (asteroid) => (
                <li key={asteroid.id}>
                  <AsteroidCard id={asteroid.id} />
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
