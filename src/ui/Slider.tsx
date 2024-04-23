import React from 'react';
import { Styles } from '../styles';
import { Config } from '../config';
import type * as U from '../utils/numbers';

import sliderStyles from './Slider.module.scss';
Styles.register('Slider', sliderStyles);

type Obj = {
  type?: 'slider';
  label: string;
  settings: U.THREE_NUMBERS;
  value: [number];
};

function pcent(s: U.THREE_NUMBERS, v: number) {
  const a = v - s[0];
  const b = s[1] - s[0];
  return `${(a / b) * 100}%`;
}

export function UiUiSlider({ o, onChange }: Config.Args<Obj>) {
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState(o.value[0]);
  const [props, setProps] = React.useState<U.THREE_NUMBERS>([0, 1, 0.01]);

  function prop(i: 0 | 1 | 2): number {
    return props[i] ? props[i] : 0;
  }

  React.useEffect(() => {
    const s = o.settings;
    const v = o.value[0];
    setProps(s);
    setValue(v);
    thumbRef.current?.style.setProperty('--width', pcent(s, v));
  }, [o]);

  function beforeOnChange(e: any) {
    const v = Number(e.target.value);
    o.value[0] = v;
    setValue(v);
    thumbRef.current?.style.setProperty('--width', pcent(props, v));
    if (onChange) onChange(o);
  }

  const styles = Styles.of('Slider');

  return (
    <div className={styles.uiSlider}>
      <div ref={thumbRef} className={styles.uiSliderThumbReplacement}></div>
      <div className={styles.uiSliderFlexContainer}>
        <label htmlFor={o.label}>{o.label}</label>
        <div className={styles.uiSliderValue}>{value}</div>
      </div>
      <input
        type="range"
        name={o.label}
        min={prop(0)}
        max={prop(1)}
        step={prop(2)}
        value={value}
        onChange={beforeOnChange}
      />
    </div>
  );
}
type Alt = {
  settings: { min: number; max: number; step: number };
  value: number;
};
Config.register(
  UiUiSlider,
  'slider',
  (o: Config.Alt<Obj, Alt>, onChange?: (o: Obj) => void) => {
    const obj = o as Obj;
    const s = o.settings;
    obj.type = 'slider';
    obj.settings = Array.isArray(s)
      ? (s as U.THREE_NUMBERS)
      : [s.min, s.max, s.step];
    obj.value = Array.isArray(o.value) ? o.value : [o.value];
    return <UiUiSlider key={obj.label} o={obj} onChange={onChange} />;
  }
);
