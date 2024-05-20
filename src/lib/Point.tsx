import React from 'react';
import { UiUi } from '../UiUi';
import { UiUiSlider } from './Slider';
import PointStyles from './Point.module.scss';

export const UiUiPoint = UiUi.Element<
  UiUi.ElSettings<UiUi.XY.Step.Settings, UiUi.T.N6>,
  UiUi.ElValue<UiUi.T.N2>
>(
  'Point',
  ({ o, onChange }) => {
    const [value, setValue] = React.useState(o.value);
    const [properties, setProperties] = React.useState(o.settings);
    const stepCtrls = UiUi.XY.Step.getCtrlsFromArray(o.settings);

    React.useEffect(() => {
      setValue(o.value);
      setProperties(o.settings);
    }, [o]);

    function onSliderUpdate(obj: any) {
      o.value['XY'.indexOf(obj.label)] = obj.value[0];
      setValue([...o.value]);
      if (onChange) onChange(o);
    }

    function onHandleUpdate(k: string, v: UiUi.T.N2) {
      o.value[0] = v[0];
      o.value[1] = v[1];
      setValue([...o.value]);
      if (onChange) onChange(o);
    }

    function elO(i: number) {
      const label = 'XY'[i];
      const k = label.toLocaleLowerCase() as keyof typeof properties;
      return {
        label,
        value: [value[i]] as [number],
        settings: properties[k],
      };
    }

    const gHP = () => ({
      value,
      stepCtrls,
      onChange: onHandleUpdate,
    });

    const gsP = (id: number) => ({
      o: elO(id),
      onChange: onSliderUpdate,
    });

    const styles = UiUi.useTheme().ns('Point');

    return (
      <div className={styles.element}>
        {UiUi.El.Label.build({ label: o.label, orientation: 'v' })}
        <UiUi.El.Group>
          <UiUi.El.XY>
            <UiUi.El.XYHandle {...gHP()} />
          </UiUi.El.XY>
          <UiUi.El.Group flow="row">
            <UiUiSlider {...gsP(0)} />
            <UiUiSlider {...gsP(1)} />
          </UiUi.El.Group>
        </UiUi.El.Group>
        <input type="hidden" name={o.label} value={value.toString()} />
      </div>
    );
  },
  {
    styles: PointStyles,
    builder: (Tag, mixCfg, o, opts) => {
      function enforceSettings(
        s: UiUi.T.N6 | UiUi.XY.Step.Settings
      ): UiUi.XY.Step.Settings {
        if (!Array.isArray(s)) return s;
        return {
          x: s.slice(0, 3) as UiUi.T.N3,
          y: s.slice(3) as UiUi.T.N3,
        };
      }
      o.settings = enforceSettings(mixCfg.settings);
      return <Tag key={o.label} o={o} onChange={opts.onChange} />;
    },
  }
);
