import { useRouter } from 'next/router';

export const Identification = () => {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push('results');
      }}
    >
      <input placeholder="Nome do viajante" />
      <button type="submit">Vai</button>
    </form>
  );
};
