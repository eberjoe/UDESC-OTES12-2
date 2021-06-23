import { useState } from 'react';
import { AsteroidData } from '../../models';

type AsteroidCardProps = AsteroidData & {
  handleclick: () => void;
};

export const AsteroidCard = ({
  name,
  passDistance,
  passTime,
  estDiameter,
  isDangerous,
  handleclick
}: AsteroidCardProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`card${selected ? ' selected' : ''}`}
      onClick={() => {
        handleclick();
        setSelected(true);
      }}
    >
      <p>
        <b>Nome: </b>
        {name}
      </p>
      <p>
        <b>Maior aproximação: </b>
        {passDistance}
      </p>
      <p>
        <b>Hora da aproximação: </b>
        {passTime}
      </p>
      <p>
        <b>Diâmetro estimado: </b>
        {`${Intl.NumberFormat('pt').format(estDiameter)} km`}
      </p>
      <p>
        <b>{isDangerous ? 'Perigoso' : 'Sem Perigo'}</b>
      </p>
    </div>
  );
};
