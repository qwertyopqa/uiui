import React from 'react';
import XYStyles from './XY.module.scss';
import { XYStepSettings } from './types';
import { StepCtrl } from 'utils/numbers';
import { UiUiCanvasBckgd } from './XYPadCanvasBackground';
import { UiUiXYHandle } from './XYHandle';

export function getXYCtrlsFromArray(s: XYStepSettings) {
  return {
    x: StepCtrl.fromArray(s.x),
    y: StepCtrl.fromArray(s.y),
  };
}
const grayBackground = <div className={XYStyles.defaultBackground} />;

type iHandle = ReturnType<typeof UiUiXYHandle>;
type iBack = ReturnType<typeof UiUiCanvasBckgd>;
type iChild = iHandle | iBack;
type Args = {
  children: iChild[] | iChild;
  background?: React.JSX.Element;
};

export function UiUiXYPad({ children, background = grayBackground }: Args) {
  const handles: iHandle[] = [];
  let bckgd: iBack | React.JSX.Element = background;
  const _ch: React.JSX.Element[] = [];
  const ch = !Array.isArray(children) ? [children] : children;

  ch.forEach((c: iChild) => {
    if (c.type.prototype.constructor === UiUiXYHandle) {
      handles.push(c as iHandle);
    } else if (c.type.prototype.constructor === UiUiCanvasBckgd) {
      bckgd = c as iBack;
    } else {
      _ch.push(c as any as React.JSX.Element);
    }
  });
  return (
    <div className={XYStyles.xy}>
      <div className={XYStyles.backgroundWrapper}>{bckgd as any}</div>
      <div className={XYStyles.handlesWrapper}>{handles as any}</div>
      <div className={XYStyles.anyWrapper}>{_ch}</div>
    </div>
  );
}
