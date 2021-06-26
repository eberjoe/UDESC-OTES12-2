import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

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
        e.preventDefault();
        const user = await axios.get('/api/read-user', {
          params: { name: name }
        });
        if (!user.data) {
          await axios.post('/api/create-user', { name: name });
          router.push('asteroids');
        } else {
          console.log(user.data);
        }
      }}
    >
      <input
        ref={inputRef}
        placeholder="Nome do viajante"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Vai</button>
    </form>
  );
};
