import React from 'react';
import { Config } from '../config';
import { ellipse } from '../utils/svg';
import { THREE_NUMBERS } from 'utils/numbers';
import KnobStyles from './Knob.module.scss';
import { UiUiRuler } from './Ruler';

type Obj = {
  type?: 'knob';
  label: string;
  settings: THREE_NUMBERS;
  value: [number];
};
type Alt = {
  settings: { min: number; max: number; step: number };
  value: number;
};

function normalize(s: THREE_NUMBERS, v: number) {
  return (v - s[0]) / (s[1] - s[0]);
}

export function UiUiKnob({ o, onChange }: Config.Args<Obj>) {
  const [rulerShow, setRulerShow] = React.useState(false);
  const [value, setValue] = React.useState(o.value[0]);
  const [normalized, setNormalized] = React.useState(0);
  const [properties, setProps] = React.useState<THREE_NUMBERS>([0, 1, 0.01]);

  React.useEffect(() => {
    setValue(o.value[0]);
    setProps(o.settings);
    setNormalized(normalize(o.settings, o.value[0]));
  }, [o]);

  const updateWithNormalizedValue = (p: number) => {
    p = Math.max(0, Math.min(1, p));
    setNormalized(p);
    o.value[0] = p * (properties[1] - properties[0]) + properties[0];
    setValue(o.value[0]);
    if (onChange) onChange(o);
  };

  let mPos: { x: number; y: number } | false = false;

  const onMouseMove = (e: any) => {
    if (mPos === false) {
      return (mPos = { x: e.clientX, y: e.clientY });
    }
    const diff =
      (e.clientX - mPos.x) * 0.005 +
      Math.round((e.clientY - mPos.y) * 50) * -0.0001;
    updateWithNormalizedValue(normalized + diff);
  };
  const onMouseUp = (e: any) => {
    e.preventDefault();
    setRulerShow(false);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  const onMouseDown = (e: any) => {
    e.preventDefault();
    setRulerShow(true);
    mPos = false;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const r = Math.PI * 0.5;
  const full = Math.PI * 1.94;

  return (
    <div className={KnobStyles.wrapper}>
      <UiUiRuler value={value} mms={properties} scale={2} show={rulerShow} />
      <svg width="16" height="14" onMouseDown={onMouseDown}>
        <path
          strokeWidth="5.5"
          fill="none"
          stroke="#999"
          opacity=".8"
          d={ellipse(8, 3.5, 0, full, r)}
        ></path>
        <path
          strokeWidth="2.5"
          fill="none"
          stroke="#fff"
          d={ellipse(8, 3.2, 0, full * normalized, r)}
        ></path>
      </svg>
    </div>
  );
}
Config.register(
  UiUiKnob,
  'knob',
  (o: Config.Alt<Obj, Alt>, onChange?: (value: Obj) => void) => {
    const obj = o as Obj;
    const s = o.settings;
    obj.type = 'knob';
    obj.settings = Array.isArray(s)
      ? (s as THREE_NUMBERS)
      : [s.min, s.max, s.step];
    obj.value = Array.isArray(o.value) ? o.value : [o.value];
    return <UiUiKnob key={obj.label} o={obj} onChange={onChange} />;
  }
);
