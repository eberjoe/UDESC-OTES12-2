import { AbcdLandMap, City } from '../../globals/consts';
import { TimeLengthCalculator } from '../../components/time-length-calculator';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get('/api/read-user').then((res) => setUser(res.data));
  }, []);

  return (
    <div className="container">
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
    </div>
  );
}
