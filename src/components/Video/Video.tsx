import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import Webcam from 'react-webcam';
import { Button } from '../Button/Button';
import styles from './Video.module.css';
import '@tensorflow/tfjs-backend-webgl';
import * as fp from 'fingerpose';
import { thumbsDownGesture } from '../../fingers/ThumbDown';
import { thumbsUpGesture } from '../../fingers/ThumbUp';
import { PixelInput } from '@tensorflow-models/hand-pose-detection/dist/shared/calculators/interfaces/common_interfaces';
import { IConfig } from '../../interfaces/Video';

const config: IConfig = {
  width: 300,
  height: 300,
  facingMode: 'user',
};

export const Video = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [ready, setReady] = useState<boolean>(false);
  const modelRef = useRef<null | handPoseDetection.HandDetector>(null);
  const cameraRef = useRef<null | Webcam>(null);
  const requestRef = useRef<null | number>(null);

  useEffect(() => {
    if (isEnabled) {
      const runHandpose = async () => {
        try {
          const model = handPoseDetection.SupportedModels.MediaPipeHands;
          const detectorConfig: handPoseDetection.MediaPipeHandsTfjsModelConfig = {
            runtime: 'tfjs',
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

      const hands: handPoseDetection.Hand[] = await modelRef.current.estimateHands((cameraRef.current as Webcam).getCanvas() as
        PixelInput);
      loading && setLoading(false)

      if (hands.length > 0 && hands[0].keypoints3D) {

        const GE = new fp.GestureEstimator([thumbsUpGesture,
          thumbsDownGesture
        ]);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const landmark: any = hands[0].keypoints3D.map(val => [val.x, val.y, val.z]);

        const estimatedGestures = GE.estimate(landmark, 6.5);

        if (estimatedGestures.gestures.length > 0) {
          const directionFinger = estimatedGestures.gestures.reduce((max, obj) => (obj.score > max.score ? obj : max), estimatedGestures.gestures[0]);
          if (directionFinger.name === 'thumbs_down' && directionFinger !== undefined) {
            window.scrollTo({
              top: window.scrollY + 100, // Прокрутить вниз на 100 пикселей
              behavior: 'smooth' // Добавить плавность прокруткиP
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
      cancelAnimationFrame(requestRef.current as number);
    };
  }, [ready, isEnabled]);

  useEffect(() => {
    if (ready && isEnabled) requestRef.current = requestAnimationFrame(detect);

    return () => {
      cancelAnimationFrame(requestRef.current as number);
    };
  }, [detect, isEnabled, ready]);

  const handleClick = () => {
    setIsEnabled(!isEnabled)
    setLoading(true)
  }

  return (
    <div className={styles.video}>
      {isEnabled && (
        <>
          <Webcam ref={cameraRef} videoConstraints={config} />
          <div className={loading ? styles.loading : styles.loaded}>
            {
              loading
              && <p className={styles.loadingText}>Loading...</p>
            }
          </div>
        </>

      )}
      <Button handleClick={handleClick} text={isEnabled ? 'Off' : 'On'} />
    </div>
  );
};
