import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import Webcam from 'react-webcam';
import { Button } from '../Button/Button';
import styles from './Video.module.css';
import '@tensorflow/tfjs-backend-webgl';
import * as fp from 'fingerpose';
import { thumbsDownGesture } from '../../fingers/ThumbDown';
import { thumbsUpGesture } from '../../fingers/ThumbUp';

const config = {
  width: 300,
  height: 300,
  facingMode: 'user',
};

export const Video = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const modelRef = useRef(null);
  const cameraRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    if (isEnabled) {
      const runHandpose = async () => {
        try {
          const model = handPoseDetection.SupportedModels.MediaPipeHands;
          const detectorConfig = {
            runtime: 'tfjs', // or 'tfjs',
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
            modelType: 'full',
          };
          modelRef.current = await handPoseDetection.createDetector(model, detectorConfig);
        } catch (e) {
          console.log(e);
        }
      };
      runHandpose();
      setReady(true);
    } else {
      cameraRef.current = null;
      modelRef.current = null;
    }
  }, [isEnabled]);

  const detect = useCallback(async () => {
    if (typeof cameraRef.current !== 'undefined' && modelRef.current && isEnabled) {
      const video = cameraRef.current.video;
      const { videoWidth, videoHeight } = video;
      video.width = videoWidth;
      video.height = videoHeight;

      const hands = await modelRef.current.estimateHands(video);

      if (hands.length > 0) {

        const GE = new fp.GestureEstimator([thumbsUpGesture,
          thumbsDownGesture
        ]);
        const landmark = hands[0].keypoints3D.map(val => [val.x, val.y, val.z]);
        const estimatedGestures = await GE.estimate(landmark, 6.5);
console.log(estimatedGestures);

        if (estimatedGestures.gestures.length > 0) {
          const directionFinger = estimatedGestures.gestures.reduce((max, obj) => (obj.score > max.score ? obj : max), estimatedGestures.gestures[0]);
          if (directionFinger.name === 'thumbs_down' && directionFinger !== undefined) {
            window.scrollTo({
              top: window.scrollY + 100, // Прокрутить вниз на 100 пикселей
              behavior: 'smooth' // Добавить плавность прокрутки
            });
          }
          else if (directionFinger.name === 'thumbs_up' !== undefined) {
            window.scrollTo({
              top: window.scrollY - 100, // Прокрутить вниз на 100 пикселей
              behavior: 'smooth' // Добавить плавность прокрутки
            });
          }
        }

      }

    }

    if (ready && isEnabled) {
      requestRef.current = requestAnimationFrame(detect);
    }
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [ready, isEnabled]);

  useEffect(() => {
    if (ready && isEnabled) requestRef.current = requestAnimationFrame(detect);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [detect, isEnabled, ready]);

  return (
    <div className={styles.video}>
      {isEnabled && (
        <Webcam ref={cameraRef} videoConstraints={config} />
      )}
      <Button handleClick={() => setIsEnabled(!isEnabled)} text={isEnabled ? 'Off' : 'On'} />
    </div>
  );
};
