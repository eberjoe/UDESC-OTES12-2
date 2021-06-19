import { useRouter } from 'next/router';
import { useState } from 'react';
import { Globals } from '../../globals/consts';

export const Identification = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        Globals['name'] = name;
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
