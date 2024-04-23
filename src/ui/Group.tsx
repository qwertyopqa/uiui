import React from 'react';
import styles from './Group.module.scss';

type Args = {
  children: JSX.Element[] | JSX.Element;
  flow?: 'col' | 'row';
};

export function UiUiGroup({ children, flow }: Args) {
  return (
    <div className={styles.uiGroup} data-flow={flow ?? 'col'}>
      {children}
    </div>
  );
}
