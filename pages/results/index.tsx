import { AbcdLandMap, City } from '../../globals/consts';
import { TravelLength } from '../../components/DistanceCalculator';
import styles from '../../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <h1>{`Wellie faz o percurso ${AbcdLandMap[City.A].name} - ${
          AbcdLandMap[City.B].name
        } - ${AbcdLandMap[City.C].name} - ${
          AbcdLandMap[City.D].name
        } em ${Intl.NumberFormat('pt').format(
          TravelLength({
            pointA: AbcdLandMap[City.A].position,
            pointB: AbcdLandMap[City.B].position,
            speed: 24
          }) +
            TravelLength({
              pointA: AbcdLandMap[City.B].position,
              pointB: AbcdLandMap[City.C].position,
              speed: 30
            }) +
            TravelLength({
              pointA: AbcdLandMap[City.C].position,
              pointB: AbcdLandMap[City.D].position,
              speed: 30
            })
        )} wors`}</h1>
      </div>
    </div>
  );
}
