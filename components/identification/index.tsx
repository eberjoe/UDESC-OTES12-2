import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const Identification = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await axios.post('/api/create-user', { name: name });
        router.push('results');
      }}
    >
      <input
        placeholder="Nome do viajante"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Vai</button>
    </form>
  );
};
