import React from 'react';
import { Theme, Styles } from '../Styles';
import { ThemeProvider } from '../themes/ThemeContext';
import { UiUiUtilLayer } from './utils/GlobalLayer';
import { Config } from '../Config';

import RootStyles from './Root.module.scss';
Styles.register('Root', RootStyles);

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

  const rootTheme = Theme.withName(theme);

  function onChange(o: any) {
    console.log(o);
  }

  const pushElems = React.useCallback(
    (cfg: Config.Json, dock: 'T' | 'B') => {
      const opts = {
        onChange,
        isRoot: true,
        outterFlow: 'row',
        theme: rootTheme,
      };
      const els = Config.render(cfg, opts);
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

  const getThemeClasses = () => rootTheme.getVars().join(' ');

  return (
    <ThemeProvider themeId={theme}>
      <div
        className={`${rootTheme.getStyle('Root.wrapper')} ${getThemeClasses()}`}
      >
        <UiUiUtilLayer></UiUiUtilLayer>
        <div className={rootTheme.getStyle('Root.docks')}>
          <div rel="dock" className={rootTheme.getStyle('Root.topDock')}>
            {tElems}
          </div>
          <div rel="dock" className={rootTheme.getStyle('Root.bottomDock')}>
            {bElems}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

RootElem.withData = (data: Args['data']) => <RootElem data={data} />;
