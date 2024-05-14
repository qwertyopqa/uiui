import React from 'react';
import XYStyles from './XY.module.scss';
import { XYStepSettings } from './types';
import { StepCtrl } from '../../../utils/numbers';

export function getXYCtrlsFromArray(s: XYStepSettings) {
  return {
    x: StepCtrl.fromArray(s.x),
    y: StepCtrl.fromArray(s.y),
  };
}
const grayBackground = <div className={XYStyles.defaultBackground} />;

export function UiUiXYPad({ children, background = grayBackground }: any) {
  return (
    <div className={XYStyles.xy}>
      <div className={XYStyles.backgroundWrapper}>{background}</div>
      <div className={XYStyles.handlesWrapper}>{children}</div>
    </div>
  );
}
