import React from 'react';
import { Config } from '../config';
import type * as U from '../utils/numbers';

import { Styles } from '../styles';
import sliderStyles from './Slider.module.scss';
Styles.register('Slider', sliderStyles);

type Conf<A, B = {}> = {
  Args: Config.Args<A>;
  Main: A;
  Alt: B;
  Mix: Config.Alt<A, B>;
};

type C = Conf<
  {
    type?: 'slider';
    label: string;
    settings: U.THREE_NUMBERS;
    value: [number];
  },
  {
    settings: { min: number; max: number; step: number };
    value: number;
  }
>;

function pcent(s: U.THREE_NUMBERS, v: number) {
  const a = v - s[0];
  const b = s[1] - s[0];
  return `${(a / b) * 100}%`;
}

export function UiUiSlider({ o, onChange }: C['Args']) {
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

  return (
    <div className={Styles.of('Slider.element')}>
      <div ref={thumbRef} className={Styles.of('Slider.thumb')}></div>
      <div className={Styles.of('Slider.wrapper')}>
        <label htmlFor={o.label}>{o.label}</label>
        <div className={Styles.of('Slider.value')}>{value}</div>
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

Config.register<C['Main'], C['Alt']>(UiUiSlider, 'slider', (o, opts) => {
  const obj = o as C['Main'];
  const s = o.settings;
  obj.type = 'slider';
  obj.settings = Array.isArray(s)
    ? (s as U.THREE_NUMBERS)
    : [s.min, s.max, s.step];
  obj.value = Array.isArray(o.value) ? o.value : [o.value];
  return <UiUiSlider key={obj.label} o={obj} onChange={opts.onChange} />;
});
