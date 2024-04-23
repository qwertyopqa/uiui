import React from 'react';
import { Styles } from '../styles';
import { Config } from '../config';

import selectStyles from './Select.module.scss';
Styles.register('Select', selectStyles);

type Obj = {
  type?: 'select';
  label: string;
  settings: { [key: string]: string };
  value: [string];
};

export function UiUiSelect({ o, onChange }: Config.Args<Obj>) {
  const selectRef = React.useRef<HTMLSelectElement>(null);
  const [value, setValue] = React.useState(o.value[0]);

  function beforeOnChange(e: any) {
    const v = e.target.value as string;
    o.value[0] = v;
    setValue(v);
    if (onChange) onChange(o);
  }

  const styles = Styles.of('Select');

  return (
    <div className={styles.uiSelect}>
      <label htmlFor={o.label}>{o.label}</label>
      <select ref={selectRef} defaultValue={value} onChange={beforeOnChange}>
        {Object.entries(o.settings).map(([key, val]) => (
          <option key={key} value={key}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}
type Alt = {
  settings: string[];
  value: string | number;
};
Config.register(
  UiUiSelect,
  'select',
  (o: Config.Alt<Obj, Alt>, onChange?: (o: Obj) => void) => {
    const obj = o as Obj;
    const s = o.settings;
    obj.type = 'select';
    if (Array.isArray(s)) {
      obj.settings = {};
      s.forEach((el, i) => {
        obj.settings[i] = el;
      });
    }
    obj.value = Array.isArray(o.value) ? o.value : [`${o.value}`];
    return <UiUiSelect key={obj.label} o={obj} onChange={onChange} />;
  }
);
