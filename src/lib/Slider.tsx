import React from 'react';
import { UiUi } from '../UiUi';
import sliderStyles from './Slider.module.scss';

export const UiUiSlider = UiUi.Element<
  UiUi.ElSettings<UiUi.T.N3, { min: number; max: number; step: number }>,
  UiUi.ElValue<UiUi.T.N1, number>
>(
  'Slider',
  ({ o, onChange }) => {
    const thumbRef = React.useRef<HTMLDivElement>(null);
    const [value, setValue] = React.useState(o.value[0]);
    const [props, setProps] = React.useState<UiUi.T.N3>([0, 1, 0.01]);

    const updateWidth = (val: string) =>
      thumbRef.current?.style.setProperty('--width', val);

    const pcent = (s: UiUi.T.N3, v: number) =>
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
    builder: (Tag, mixedConfig, finalConfig, options) => {
      const s = mixedConfig.settings;
      finalConfig.settings = Array.isArray(s)
        ? (s as UiUi.T.N3)
        : [s.min, s.max, s.step];
      finalConfig.value = Array.isArray(mixedConfig.value)
        ? mixedConfig.value
        : [mixedConfig.value];
      return (
        <Tag
          key={finalConfig.label}
          o={finalConfig}
          onChange={options.onChange}
        />
      );
    },
  }
);
