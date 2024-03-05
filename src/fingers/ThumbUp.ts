import {
  Finger,
  FingerCurl,
  Gestures
} from 'fingerpose'

export const thumbsUpGesture = Gestures.ThumbsUpGesture;

for (const finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thumbsUpGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  thumbsUpGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}