import Link from 'next/link';

export default function Farewell() {
  return (
    <div className="container">
      <h1>Parabéns! Sua viagem intergaláctica foi agendada!</h1>
      <Link href="/">Voltar</Link>
    </div>
  );
}
