import React from 'react';
import { Config } from '../config';

import { UiUiLabel } from './utils/Label';
import { UiUiGroup } from './utils/Group';

import { Styles } from '../styles';
import PanelStyles from './Panel.module.scss';
Styles.register('Panel', PanelStyles);

type Flows = 'row' | 'col';
type Obj = Config.Obj<'panel', { flow: Flows }, Config.Elem[]>;
type Alt = { settings: undefined | { flow: undefined } };

type Args = Config.Args<Obj> & { isRoot?: boolean; outterFlow?: Flows };

export function UiUiPanel({ o, onChange, outterFlow, isRoot = false }: Args) {
  const [children, setChildren] = React.useState<JSX.Element[]>([]);

  React.useEffect(() => {
    setChildren(
      Config.render(o.value, { onChange, outterFlow: o.settings.flow })
    );
  }, [o, onChange]);

  const props = () => {
    const p: { [key: string]: string } = {
      className: Styles.of('Panel.Base'),
      'data-type': 'panel',
      'data-outter-flow': outterFlow ?? 'col',
    };
    if (isRoot) {
      p['data-root'] = 'true';
      p.className = Styles.concat(p.className, 'Panel.Root');
    } else {
      p.className = Styles.concat(p.className, 'Panel.Nested');
      if (outterFlow === 'col') {
        p.className = Styles.concat(p.className, 'Panel.OnColumn');
      } else {
        p.className = Styles.concat(p.className, 'Panel.OnRow');
      }
    }
    return p;
  };

  return (
    <div {...props()}>
      {UiUiLabel.build(o.label)}
      <UiUiGroup flow={o.settings.flow ?? 'col'}>{children}</UiUiGroup>
    </div>
  );
}

const builder: Config.Builder<Obj, Alt> = (o, opts) => {
  const obj = o as Obj;
  obj.type = 'panel';
  if (obj.settings === undefined) obj.settings = { flow: 'row' };
  if (obj.settings.flow === undefined) obj.settings.flow = 'row';
  return (
    <UiUiPanel
      key={o.label}
      o={obj}
      onChange={opts.onChange}
      isRoot={opts.isRoot}
      outterFlow={opts.outterFlow}
    />
  );
};

Config.register(UiUiPanel, 'panel', builder);
