import React from 'react';
import styles from './UiUi.module.scss';
import { UiUiUtilLayer } from 'ui/utils/GlobalLayer';

import { Config } from './config';

type Args = {
  data: Config.Json | Config.ProcessorInfo | null;
  defaultDock?: string;
  top?: Config.Json | Config.ProcessorInfo | null;
  bottom?: Config.Json | Config.ProcessorInfo | null;
};
export function RootElem({ data, top, bottom, defaultDock = 'B' }: Args) {
  const [tElems, setTElems] = React.useState<JSX.Element[]>([]);
  const [bElems, setBElems] = React.useState<JSX.Element[]>([]);

  function onChange(o: any) {
    console.log(o);
  }

  const pushElems = React.useCallback(
    (els: JSX.Element[], dock: 'T' | 'B') => {
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
      if (defaultDock === 'B') {
        setBElems(Config.render(pdata, onChange));
      } else {
        setTElems(Config.render(pdata, onChange));
      }
    }
    if (top) {
      const pdata = Array.isArray(top) ? top : Config.process(top);
      pushElems(Config.render(pdata, onChange), 'T');
    }
    if (bottom) {
      const pdata = Array.isArray(bottom) ? bottom : Config.process(bottom);
      pushElems(Config.render(pdata, onChange), 'B');
    }
  }, [data, bottom, top, defaultDock]);

  return (
    <div className={`${styles.uiUiRoot} ${styles.vars}`}>
      <UiUiUtilLayer></UiUiUtilLayer>
      <div className={styles.docks}>
        <div rel="dock" className={styles.topDock}>
          {tElems}
        </div>
        <div rel="dock" className={styles.bottomDock}>
          {bElems}
        </div>
      </div>
    </div>
  );
}

RootElem.withData = (data: Args['data']) => <RootElem data={data} />;
