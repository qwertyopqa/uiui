import React from 'react';
import styles from './styles.module.scss';
import { XYStepSettings } from './types';
import { StepCtrl } from '../../../utils/numbers';

export function getXYCtrlsFromArray(s: XYStepSettings) {
  return {
    x: StepCtrl.fromArray(s.x),
    y: StepCtrl.fromArray(s.y),
  };
}
const grayBackground = <div className={styles.defaultBackground} />;

export function UiUiXYPad({ children, background = grayBackground }: any) {
  return (
    <div className={styles.xy}>
      <div className={styles.backgroundWrapper}>{background}</div>
      <div className={styles.handlesWrapper}>{children}</div>
    </div>
  );
}
