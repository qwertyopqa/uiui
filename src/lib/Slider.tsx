import React from 'react';
import type * as U from '../utils/numbers';
import { UiUi } from '../UiUi';
import sliderStyles from './Slider.module.scss';

export const UiUiSlider = UiUi.Lib.addElement<
  {
    label: string;
    settings: U.THREE_NUMBERS;
    value: [number];
  },
  {
    settings: { min: number; max: number; step: number };
    value: number;
  }
>(
  'Slider',
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

    const style = UiUi.useTheme().ns('Slider');

    return (
      <div className={style.element}>
        <div ref={thumbRef} className={style.thumb}></div>
        <div className={style.wrapper}>
          <label htmlFor={o.label}>{o.label}</label>
          <div className={style.value}>{value}</div>
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
    styles: sliderStyles,
    builder: (Tag, mixCfg, o, opts) => {
      const s = mixCfg.settings;
      o.settings = Array.isArray(s)
        ? (s as U.THREE_NUMBERS)
        : [s.min, s.max, s.step];
      o.value = Array.isArray(mixCfg.value) ? mixCfg.value : [mixCfg.value];
      return <Tag key={o.label} o={o} onChange={opts.onChange} />;
    },
  }
);
