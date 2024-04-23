import React from 'react';
import styles from './Point.module.scss';
import { Config } from '../config';
import { UiUiSlider } from './Slider';
import { UiUiGroup } from './Group';
import { XY } from './utils/XY';
import { TWO_NUMBERS, SIX_NUMBERS, THREE_NUMBERS } from 'utils/numbers';

type Obj = {
  type?: 'point';
  label: string;
  settings: XY.Step.Settings;
  value: TWO_NUMBERS;
};
type Args = Config.Args<Obj>;

export function UiUiPoint({ o, onChange }: Args) {
  const [value, setValue] = React.useState(o.value);
  const [properties, setProperties] = React.useState(o.settings);
  const stepCtrls = XY.Step.getCtrlsFromArray(o.settings);

  React.useEffect(() => {
    setValue(o.value);
    setProperties(o.settings);
  }, [o]);

  function onSliderUpdate(obj: any) {
    o.value['XY'.indexOf(obj.label)] = obj.value[0];
    setValue([...o.value]);
    if (onChange) onChange(o);
  }
  function onHandleUpdate(k: string, v: TWO_NUMBERS) {
    o.value[0] = v[0];
    o.value[1] = v[1];
    setValue([...o.value]);
    if (onChange) onChange(o);
  }

  function elO(i: number) {
    const label = 'XY'[i];
    const k = label.toLocaleLowerCase() as keyof Obj['settings'];
    return {
      label,
      value: [value[i]] as [number],
      settings: properties[k],
    };
  }

  return (
    <div rel="panel" className={styles.wrapper}>
      <label>
        {o.label}
        <span>&nbsp;</span>
      </label>
      <UiUiGroup>
        <XY.Pad className={styles.xy}>
          <XY.Handle
            value={value}
            stepCtrls={stepCtrls}
            onChange={onHandleUpdate}
          />
        </XY.Pad>
        <UiUiSlider o={elO(0)} onChange={onSliderUpdate} />
        <UiUiSlider o={elO(1)} onChange={onSliderUpdate} />
      </UiUiGroup>
      <input type="hidden" name={o.label} value={value.toString()} />
    </div>
  );
}

type Alt = {
  settings: SIX_NUMBERS;
};
function boot(o: Config.Alt<Obj, Alt>, onChange?: Args['onChange']) {
  function enforceSettings(
    s: SIX_NUMBERS | XY.Step.Settings
  ): XY.Step.Settings {
    if (!Array.isArray(s)) return s;
    return {
      x: s.slice(0, 3) as THREE_NUMBERS,
      y: s.slice(3) as THREE_NUMBERS,
    };
  }
  o.settings = enforceSettings(o.settings);
  return <UiUiPoint key={o.label} o={o as Obj} onChange={onChange} />;
}
Config.register(UiUiPoint, 'point', boot);
