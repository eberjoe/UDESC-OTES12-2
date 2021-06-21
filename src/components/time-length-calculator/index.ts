import { Point2D } from '../../globals/consts';

export const TimeLengthCalculator = ({
  pointA,
  pointB,
  speed
}: {
  pointA: Point2D;
  pointB: Point2D;
  speed: number;
}) => {
  const distance = Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
  );

  const timeLength = speed / distance;

  return timeLength;
};
