type Point2D = { x: number; y: number };

export enum City {
  A,
  B,
  C,
  D
}

export const AbcdLandMap = [
  { name: 'A', position: { x: 0, y: 0 } },
  { name: 'B', position: { x: 0, y: 4 } },
  { name: 'C', position: { x: 0, y: 12 } },
  { name: 'D', position: { x: 0, y: 22 } }
];

export function travelLength(pointA: Point2D, pointB: Point2D, speed: number) {
  const distance = Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
  );

  const timeLength = speed / distance;

  return timeLength;
}
