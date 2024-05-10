import React from 'react';
import { UiUi } from '../UiUi';
import { UiUiLabel } from './utils/Label';
import { UiUiGroup } from './utils/Group';
import PanelStyles from './Panel.module.scss';

type Flows = 'row' | 'col';

export const UiUiPanel = UiUi.Lib.addElement<
  {
    label: string;
    settings: { flow: Flows };
    value: UiUi.Config.Elem[];
  },
  { settings: undefined | { flow: undefined } },
  { isRoot?: boolean; outterFlow?: Flows }
>(
  'Panel',
  ({ o, onChange, outterFlow, isRoot = false }) => {
    const [children, setChildren] = React.useState<JSX.Element[]>([]);

    React.useEffect(() => {
      setChildren(
        UiUi.Config.render(o.value, { onChange, outterFlow: o.settings.flow })
      );
    }, [o, onChange]);

    const props = () => {
      const p: { [key: string]: string } = {
        className: UiUi.Styles.of('Panel.Base'),
        'data-type': 'panel',
        'data-outter-flow': outterFlow ?? 'col',
      };
      if (isRoot) {
        p['data-root'] = 'true';
        p.className = UiUi.Styles.concat(p.className, 'Panel.Root');
      } else {
        p.className = UiUi.Styles.concat(p.className, 'Panel.Nested');
        if (outterFlow === 'col') {
          p.className = UiUi.Styles.concat(p.className, 'Panel.OnColumn');
        } else {
          p.className = UiUi.Styles.concat(p.className, 'Panel.OnRow');
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
  },
  {
    styles: PanelStyles,
    builder: (Tag, mixCfg, o, opts) => {
      if (mixCfg.settings === undefined) o.settings = { flow: 'row' };
      if (o.settings.flow === undefined) o.settings = { flow: 'row' };
      return (
        <Tag
          key={o.label}
          o={o}
          onChange={opts.onChange}
          outterFlow={opts.outterFlow}
          isRoot={opts.isRoot}
        />
      );
    },
  }
);
