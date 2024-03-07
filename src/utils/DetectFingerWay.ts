export function checkThumbAndFingers(keypoints: Keypoint3D[], handedness: string): string | undefined {
// перевірка на достатню кількість точок
  if (keypoints.length < 5 * 4) {
    return "Unknown";
  }

  // напрям великого пальця
  const thumbDirection = getFingerDirection(keypoints);

  // перевірка на зігнуті пальці
  const curledFingers = []
  for (let finger = 1; finger < 5; finger++) {
    curledFingers.push(isFingerCurled(keypoints, finger, handedness))
  }


  if (curledFingers.some(el => el === false)) return;
  return thumbDirection;
}


function getFingerDirection(keypoints: Keypoint3D[]): string {

  const base = keypoints[1]; // початок великого пальця
  const tip = keypoints[4]; // кінець

  if (tip.y > base.y) {
    return "down";
  } else {
    return "up";
  }
}

function isFingerCurled(keypoints: Keypoint3D[], finger: number, handedness: string): boolean {
  // індекси початковой і кінцевой точки
  const baseIndex = finger * 4 + 1;
  const tipIndex = finger * 4 + 4;

  // Координати базовой і кінцевой
  const base = keypoints[baseIndex];
  const tip = keypoints[tipIndex];

  if (tip.z === undefined || base.z === undefined) return false;
  return handedness === 'Left' ? tip.x < base.x : tip.x > base.x;

}

interface Keypoint3D {
  x: number;
  y: number;
  z?: number;
  name?: string;
}