import React from 'react';
import { UiUiLib } from '../lib';
import { UiUiSlider } from './Slider';
import { UiUiGroup } from './utils/Group';
import { UiUiLabel } from './utils/Label';
import { XY } from './utils/XY';
import { TWO_NUMBERS, SIX_NUMBERS, THREE_NUMBERS } from 'utils/numbers';

import { Styles } from '../styles';
import PointStyles from './Point.module.scss';

Styles.register('Point', PointStyles);

type C = UiUiLib.Props<
  {
    type?: 'point';
    label: string;
    settings: XY.Step.Settings;
    value: TWO_NUMBERS;
  },
  {
    settings: SIX_NUMBERS;
  }
>;

export const UiUiPoint = UiUiLib.El<C>(
  ({ o, onChange }) => {
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
      const k = label.toLocaleLowerCase() as keyof C['Main']['settings'];
      return {
        label,
        value: [value[i]] as [number],
        settings: properties[k],
      };
    }

    return (
      <div className={Styles.of('Point.element')}>
        {UiUiLabel.build({ label: o.label, orientation: 'v' })}
        <UiUiGroup>
          <XY.Pad>
            <XY.Handle
              value={value}
              stepCtrls={stepCtrls}
              onChange={onHandleUpdate}
            />
          </XY.Pad>
          <UiUiGroup flow="row">
            <UiUiSlider o={elO(0)} onChange={onSliderUpdate} />
            <UiUiSlider o={elO(1)} onChange={onSliderUpdate} />
          </UiUiGroup>
        </UiUiGroup>
        <input type="hidden" name={o.label} value={value.toString()} />
      </div>
    );
  },
  {
    id: 'point',
    tag: 'Point',
    styles: PointStyles,
    builder: (Tag, mixedConfig, opts) => {
      function enforceSettings(
        s: SIX_NUMBERS | XY.Step.Settings
      ): XY.Step.Settings {
        if (!Array.isArray(s)) return s;
        return {
          x: s.slice(0, 3) as THREE_NUMBERS,
          y: s.slice(3) as THREE_NUMBERS,
        };
      }
      const o = mixedConfig as any as C['Main'];
      o.settings = enforceSettings(o.settings);
      return <Tag key={o.label} o={o} onChange={opts.onChange} />;
    },
  }
);

/*
const builder: Config.Builder<Obj, Alt> = (o, opts) => {
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
  return <UiUiPoint key={o.label} o={o as Obj} onChange={opts.onChange} />;
};

Config.register(UiUiPoint, 'point', builder);
*/
