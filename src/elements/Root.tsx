import React from 'react';
import RootStyles from './Root.module.scss';
import { Theme } from '../styles';
import { UiUiUtilLayer } from './utils/GlobalLayer';

import { Config } from '../config';

type Args = {
  data: Config.Json | Config.ProcessorInfo | null;
  defaultDock?: 'T' | 'B';
  top?: Config.Json | Config.ProcessorInfo | null;
  bottom?: Config.Json | Config.ProcessorInfo | null;
  theme?: string;
};
export function RootElem({
  data,
  top,
  bottom,
  defaultDock = 'B',
  theme = 'base',
}: Args) {
  const [tElems, setTElems] = React.useState<JSX.Element[]>([]);
  const [bElems, setBElems] = React.useState<JSX.Element[]>([]);

  function onChange(o: any) {
    console.log(o);
  }

  const pushElems = React.useCallback(
    (cfg: Config.Json, dock: 'T' | 'B') => {
      const opts = { onChange, isRoot: true, outterFlow: 'row' };
      const els = Config.renderPanels(cfg, opts);
      if (dock === 'T') {
        setTElems([...tElems, ...els]);
      } else {
        setBElems([...bElems, ...els]);
      }
    },
    [tElems, bElems]
  );

  React.useEffect(() => {
    if (data === null && top === null && bottom === null) return;
    if (data !== null) {
      const pdata = Array.isArray(data) ? data : Config.process(data);
      pushElems(pdata, defaultDock);
    }
    if (top) {
      const pdata = Array.isArray(top) ? top : Config.process(top);
      pushElems(pdata, 'T');
    }
    if (bottom) {
      const pdata = Array.isArray(bottom) ? bottom : Config.process(bottom);
      pushElems(pdata, 'B');
    }
  }, [data, bottom, top, defaultDock]);

  const getThemeClassName = (key: string) => Theme.of(key) ?? Theme.of('base');

  return (
    <div className={`${RootStyles.uiUiRoot} ${getThemeClassName(theme)}`}>
      <UiUiUtilLayer></UiUiUtilLayer>
      <div className={RootStyles.docks}>
        <div rel="dock" className={RootStyles.topDock}>
          {tElems}
        </div>
        <div rel="dock" className={RootStyles.bottomDock}>
          {bElems}
        </div>
      </div>
    </div>
  );
}

RootElem.withData = (data: Args['data']) => <RootElem data={data} />;
