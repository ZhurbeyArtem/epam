import {
  Finger,
  GestureDescription,
  FingerCurl,
  FingerDirection,
} from 'fingerpose'

export const thumbsDownGesture = new GestureDescription('thumbs_down');

thumbsDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl);
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);

thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.9);
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.9);
