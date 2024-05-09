import React from 'react';
import { THREE_NUMBERS } from 'utils/numbers';
import RulerStyles from './Ruler.module.scss';

type Args = {
  mms: THREE_NUMBERS;
  value: number;
  scale: number;
  show: boolean;
};
function normalize(s: THREE_NUMBERS, v: number) {
  return (v - s[0]) / (s[1] - s[0]);
}

export function UiUiRuler({ value, mms, scale = 1, show = false }: Args) {
  /* eslint-disable no-unused-vars */
  const rulerRef = React.useRef<HTMLDivElement>(null);
  const [display, setDisplay] = React.useState(show ? 'block' : 'none');
  const [val, setVal] = React.useState(value);
  const [normalized, setNormalized] = React.useState(0);
  const [properties, setProps] = React.useState<THREE_NUMBERS>([0, 1, 0.01]);
  /* eslint-enable no-unused-vars */
  React.useEffect(() => {
    setVal(value);
    setProps(mms);
    const n = normalize(mms, value);
    setNormalized(n);
    setDisplay(show ? 'block' : 'none');
    rulerRef.current?.style.setProperty('--val', `${n * 100}%`);
  }, [value, mms, show]);

  return (
    <div
      className={RulerStyles.rulerWrapper}
      ref={rulerRef}
      data-show={display}
    >
      <div className={RulerStyles.ruler}>
        <div className={RulerStyles.rulerInner}>
          <div role="unit" data-u="0"></div>
          <div role="unit" data-u="0.25"></div>
          <div role="unit" data-u="0.5"></div>
          <div role="unit" data-u="0.75"></div>
          <div role="unit" data-u="1"></div>
        </div>
      </div>
      <div className={RulerStyles.rulerIndicator}></div>
    </div>
  );
}
