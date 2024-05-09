import React from 'react';
import styles from './styles.module.scss';
import { XYStepCtrls } from './types';
import { getDragabbleArea, setElemPos } from '../../../utils/dom';
import { DragOnParentDelegate } from '../../../utils/delegate';
import { TWO_NUMBERS } from '../../../utils/numbers';

type DragInfo = {
  normalized: { x: number; y: number };
};

type Options = {
  id: string;
  label: string;
  flipY: boolean;
  flipX: boolean;
};

type Args = {
  value: TWO_NUMBERS;
  stepCtrls: XYStepCtrls;
  onChange: (key: string, v: TWO_NUMBERS) => void;
  options?: Partial<Options>;
};

function denorm(v: TWO_NUMBERS, c: XYStepCtrls, opts: Options): TWO_NUMBERS {
  v[0] = c.x.denormalize(opts.flipX ? 1 - v[0] : v[0]);
  v[1] = c.y.denormalize(opts.flipY ? 1 - v[1] : v[1]);
  return v;
}

function norm(v: TWO_NUMBERS, c: XYStepCtrls, opts: Options): TWO_NUMBERS {
  const r = [c.x.normalize(v[0]), c.y.normalize(v[1])] as TWO_NUMBERS;
  return [opts.flipX ? 1 - r[0] : r[0], opts.flipY ? 1 - r[1] : r[1]];
}

function updateDisplay(
  v: TWO_NUMBERS,
  c: XYStepCtrls,
  e: HTMLElement | null,
  opts: Options
) {
  if (e === null) return;
  const avail = getDragabbleArea(e);
  const n = norm(v, c, opts);
  setElemPos(e, {
    x: n[0] * avail.w,
    y: n[1] * avail.h,
  });
}

function processOptions(o: Partial<Options> | undefined): Options {
  return {
    id: 'default',
    label: '',
    flipY: true,
    flipX: false,
    ...(o || {}),
  };
}

export function UiUiXYHandle({ value, stepCtrls, onChange, options }: Args) {
  const opts = processOptions(options);
  const xyHandleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    updateDisplay(value, stepCtrls, xyHandleRef.current, opts);
  }, [value, opts, stepCtrls]);

  React.useEffect(() => {
    if (xyHandleRef.current === null) return;
    DragOnParentDelegate(xyHandleRef.current, {
      dontSetPos: true,
      all: ({ normalized: n }: DragInfo) => {
        const v = denorm([n.x, n.y], stepCtrls, opts);
        value[0] = v[0];
        value[1] = v[1];
        updateDisplay(value, stepCtrls, xyHandleRef.current, opts);
        if (onChange) onChange(opts.id, value);
      },
    });
  }, [xyHandleRef, stepCtrls, value, onChange, opts]);

  return (
    <div
      ref={xyHandleRef}
      className={styles.handle}
      data-key={opts.id}
      role="handle"
    >
      {opts.label}
    </div>
  );
}
