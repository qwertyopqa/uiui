import React from 'react';
import { UiUi } from '../UiUi';
import SelectStyles from './Select.module.scss';

export const UiUiSelect = UiUi.Element<
  UiUi.T.SETnVAL<UiUi.T.KVP<string>, UiUi.T.S1>,
  UiUi.T.SETnVAL<UiUi.T.S1, string | number>
>(
  'Select',
  ({ o, onChange }) => {
    const selectRef = React.useRef<HTMLSelectElement>(null);
    const [value, setValue] = React.useState(o.value[0]);

    function beforeOnChange(e: any) {
      const v = e.target.value as string;
      o.value[0] = v;
      setValue(v);
      if (onChange) onChange(o);
    }

    const styles = UiUi.useTheme().ns('Select');

    return (
      <div className={styles.element}>
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
  },
  {
    styles: SelectStyles,
    builder: (Tag, mixCfg, o, opts) => {
      const s = o.settings;
      if (Array.isArray(s)) {
        o.settings = {};
        s.forEach((el, i) => (o.settings[i] = el));
      }
      o.value = Array.isArray(o.value) ? o.value : [`${o.value}`];
      return <Tag key={o.label} o={o} onChange={opts.onChange} />;
    },
  }
);
