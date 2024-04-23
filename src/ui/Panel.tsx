import styles from './Panel.module.scss';
import React from 'react';
import { Config } from '../config';
import { UiUiGroup } from './Group';

type Obj = Config.Obj<'panel', { flow: 'row' | 'col' }, Config.Elem[]>;

export function UiUiPanel({ o, onChange }: Config.Args<Obj>) {
  const [children, setChildren] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    setChildren(Config.render(o.value, onChange));
  }, [o]);

  return (
    <div className={styles.uiPanel} rel="panel">
      <label>
        {o.label}
        <span>&nbsp;</span>
      </label>
      <UiUiGroup flow={o.settings.flow}>{children}</UiUiGroup>
    </div>
  );
}

type AltSettings = { settings: undefined | { flow: undefined } };
Config.register(
  UiUiPanel,
  'panel',
  (o: Config.Alt<Obj, AltSettings>, onChange?: (a: any) => void) => {
    const obj = o as Obj;
    obj.type = 'panel';
    if (obj.settings === undefined) obj.settings = { flow: 'row' };
    if (obj.settings.flow === undefined) obj.settings.flow = 'row';
    return <UiUiPanel key={o.label} o={obj} onChange={onChange} />;
  }
);
