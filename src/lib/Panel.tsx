import React from 'react';
import { UiUi } from '../UiUi';
import PanelStyles from './Panel.module.scss';

type Flows = 'row' | 'col';

export const UiUiPanel = UiUi.Element<
  UiUi.T.SETnVAL<{ flow: Flows }, UiUi.Lib.Element.Config[]>,
  UiUi.T.justSET<undefined | { flow: undefined }>,
  { isRoot?: boolean; outterFlow?: Flows }
>(
  'Panel',
  ({ o, onChange, outterFlow, isRoot = false }) => {
    const [children, setChildren] = React.useState<JSX.Element[]>([]);

    React.useEffect(() => {
      setChildren(
        UiUi.renderConfig(o.value, { onChange, outterFlow: o.settings.flow })
      );
    }, [o, onChange]);

    const styles = UiUi.useTheme().ns('Panel');
    const props = () => {
      const p: { [key: string]: string } = {
        className: '',
        'data-type': 'panel',
        'data-outter-flow': outterFlow ?? 'col',
      };
      const classNames = [styles.Base];
      if (isRoot) {
        p['data-root'] = 'true';
        classNames.push(styles.Root);
      } else {
        classNames.push(styles.Nested);
        if (outterFlow === 'col') {
          classNames.push(styles.onColumn);
        } else {
          classNames.push(styles.onRow);
        }
      }
      p.className = classNames.join(' ');
      return p;
    };

    return (
      <div {...props()}>
        {UiUi.El.Label.build(o.label)}
        <UiUi.El.Group flow={o.settings.flow ?? 'col'}>
          {children}
        </UiUi.El.Group>
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
