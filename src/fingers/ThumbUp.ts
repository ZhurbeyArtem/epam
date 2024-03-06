import {
  Finger,
  GestureDescription,
  FingerCurl,
  FingerDirection,
} from 'fingerpose'


export const thumbsUpGesture = new GestureDescription('thumbs_up');

thumbsUpGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl);
thumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);

thumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
thumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);

for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thumbsUpGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  thumbsUpGesture.addCurl(finger, FingerCurl.NoCurl, 0);
}