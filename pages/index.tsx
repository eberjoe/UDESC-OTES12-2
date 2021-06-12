import Head from 'next/head';
import { AbcdLandMap, City, travelLength } from '../globals/consts';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Abcdlandia</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>{`Wellie viaja de ${AbcdLandMap[City.A].name} a ${
          AbcdLandMap[City.D].name
        } em ${Intl.NumberFormat('pt').format(
          travelLength(
            AbcdLandMap[City.A].position,
            AbcdLandMap[City.B].position,
            24
          ) +
            travelLength(
              AbcdLandMap[City.B].position,
              AbcdLandMap[City.C].position,
              30
            ) +
            travelLength(
              AbcdLandMap[City.C].position,
              AbcdLandMap[City.D].position,
              30
            )
        )} wors`}</h1>
      </div>
    </div>
  );
}
