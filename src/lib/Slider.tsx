import React from 'react';
import type * as U from '../utils/numbers';
import { UiUiLib } from '../lib';
import { Styles } from '../styles';
import sliderStyles from './Slider.module.scss';

Styles.register('Slider', sliderStyles);

type C = UiUiLib.Props<
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

export const UiUiSlider = UiUiLib.El<C>(
  ({ o, onChange }) => {
    const thumbRef = React.useRef<HTMLDivElement>(null);
    const [value, setValue] = React.useState(o.value[0]);
    const [props, setProps] = React.useState<U.THREE_NUMBERS>([0, 1, 0.01]);

    const updateWidth = (val: string) =>
      thumbRef.current?.style.setProperty('--width', val);

    const pcent = (s: U.THREE_NUMBERS, v: number) =>
      `${((v - s[0]) / (s[1] - s[0])) * 100}%`;

    React.useEffect(() => {
      const v = o.value[0];
      setProps(o.settings);
      setValue(v);
      updateWidth(pcent(o.settings, v));
    }, [o]);

    function beforeOnChange(e: any) {
      o.value[0] = Number(e.target.value);
      setValue(o.value[0]);
      updateWidth(pcent(props, o.value[0]));
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
          min={props[0] ?? 0}
          max={props[1] ?? 0}
          step={props[2] ?? 0}
          value={value}
          onChange={beforeOnChange}
        />
      </div>
    );
  },
  {
    id: 'slider',
    tag: 'Slider',
    styles: sliderStyles,
    builder: (Tag, mixedConfig, opts) => {
      const obj = mixedConfig as any as C['Main'];
      const s = mixedConfig.settings;
      obj.settings = Array.isArray(s)
        ? (s as U.THREE_NUMBERS)
        : [s.min, s.max, s.step];
      obj.value = Array.isArray(mixedConfig.value)
        ? mixedConfig.value
        : [mixedConfig.value];
      return <Tag key={obj.label} o={obj} onChange={opts.onChange} />;
    },
  }
);

/*
Config.register<C['Main'], C['Alt']>(UiUiSlider, 'slider', (o, opts) => {
  const obj = o as C['Main'];
  const s = o.settings;
  obj.settings = Array.isArray(s)
    ? (s as U.THREE_NUMBERS)
    : [s.min, s.max, s.step];
  obj.value = Array.isArray(o.value) ? o.value : [o.value];
  return <UiUiSlider key={obj.label} o={obj} onChange={opts.onChange} />;
});
*/
