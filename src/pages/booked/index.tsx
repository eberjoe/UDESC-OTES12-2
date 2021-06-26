import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { Globals } from '../../global-vars';
import { formatRelative, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

export default function Booked() {
  const [asteroid, setAsteroid] = useState(null);

  useEffect(() => {
    axios
      .get('/api/read-user', { params: { name: Globals['userName'] } })
      .then((res1) => {
        axios
          .get('/api/fetch-asteroid', {
            params: { asteroid_id: res1.data.asteroid_id }
          })
          .then((res2) => {
            setAsteroid({
              name: res2.data.name,
              date: formatRelative(
                parseISO(res1.data.departure_timestamp),
                new Date(),
                { locale: pt }
              )
            });
          });
      });
  }, []);

  return (
    <div className="container">
      {asteroid && (
        <>
          <h1>{`A sua viagem a bordo do ${asteroid.name} está agendada para ${asteroid.date}`}</h1>
          <div style={{ borderRadius: '50%', overflow: 'hidden' }}>
            <Image
              src="/images/little_prince.jpg"
              width={300}
              height={300}
              alt="Viajando"
            />
          </div>
          <Link href="/">Voltar</Link>
        </>
      )}
    </div>
  );
}
