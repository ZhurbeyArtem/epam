import { useEffect, useRef, useState } from 'react';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import Webcam from 'react-webcam';
import '@tensorflow/tfjs-backend-webgl';

import { checkThumbAndFingers } from '../../utils/DetectFingerWay';
import { Button } from '../Button/Button';

import { IConfig } from '../../interfaces/Video.interface';
import styles from './Video.module.css';


const config: IConfig = {
  width: 300,
  height: 300,
  facingMode: 'user',
};

export const Video = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [ready, setReady] = useState<boolean>(false); // перевірка чи загружена модель
  const modelRef = useRef<null | handPoseDetection.HandDetector>(null);
  const cameraRef = useRef<null | Webcam>(null);

  useEffect(() => {
    const runHandpose = async () => {
      try {
        if (isEnabled) {
          setReady(false);
          const model = handPoseDetection.SupportedModels.MediaPipeHands;
          const detectorConfig: handPoseDetection.MediaPipeHandsTfjsModelConfig = {
            runtime: 'tfjs',
            modelType: 'full',
          };

          modelRef.current = await handPoseDetection.createDetector(model, detectorConfig);
          setReady(true);
        } else {
          setReady(false);
          cameraRef.current = null;
          if (modelRef.current) {
            modelRef.current.dispose();
            modelRef.current = null;
          }
        }
      } catch (error) {
        console.log("RunHandpose: ", error);
        cameraRef.current = null;
        if (modelRef.current) { // очистка при відключені компонента
          modelRef.current.dispose();
          modelRef.current = null;
        }
      }
    };
    runHandpose();
    return () => { // очистка при розмонувані
      if (modelRef.current) {
        modelRef.current.dispose();
      }
    };
  }, [isEnabled]);

  const detect = async () => {
    try {
      if (cameraRef !== null && modelRef.current) {
        const camera = cameraRef.current?.getCanvas()
        if (camera === null || camera === undefined) return;
        const hands: handPoseDetection.Hand[] = await modelRef.current.estimateHands(camera);
        loading && setLoading(false)
        if (hands.length > 0 && hands[0].keypoints3D) {
          const gestture: string | undefined = checkThumbAndFingers(hands[0].keypoints3D, hands[0].handedness)

          if (gestture === 'down') {
            window.scrollTo({
              top: window.scrollY + 100,
              behavior: 'smooth'
            });
          }
          else if (gestture === 'up') {
            window.scrollTo({
              top: window.scrollY - 100,
              behavior: 'smooth'
            });
          }
        }
      }
    } catch (error) {
      console.log("Detect: ", error);
    }

  }


  useEffect(() => {
    if (!ready || !isEnabled) return;
    const interval = setInterval(detect, 100);

    return () => {
      clearInterval(interval);
    };
  }, [ready, isEnabled]);

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
