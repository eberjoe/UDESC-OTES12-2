import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Globals } from '../../global-vars';

export const Identification = () => {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>();
  const router = useRouter();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form
      onSubmit={async (e) => {
        Globals['userName'] = name;
        e.preventDefault();
        const user = await (
          await axios.get('/api/read-user', {
            params: { name: name }
          })
        ).data;
        if (!user) {
          await axios.post('/api/create-user', { name: name });
          router.push('asteroids');
        } else if (!user.asteroid_id) {
          router.push('asteroids');
        } else {
          router.push('booked');
        }
      }}
    >
      <input
        ref={inputRef}
        placeholder="Nome do viajante"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" disabled={!name}>
        Vai
      </button>
    </form>
  );
};
