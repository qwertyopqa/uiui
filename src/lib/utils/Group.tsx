import React from 'react';

import { Styles } from '../../styles';
import GroupStyles from './Group.module.scss';
Styles.register('Group', GroupStyles);

type Args = {
  children: JSX.Element[] | JSX.Element;
  flow?: 'col' | 'row' | 'vertical' | 'horizontal';
  outterFlow?: 'col' | 'row';
};

export function UiUiGroup({ children, flow, outterFlow }: Args) {
  const props = () => {
    let f = flow ?? 'col';
    f = f === 'vertical' || f === 'col' ? 'col' : 'row';
    const p: { [key: string]: string } = {
      className: Styles.concat(
        Styles.of('Group.Base'),
        `Group.${f === 'col' ? 'Col' : 'Row'}`
      ),
      'data-flow': f,
      'data-outter-flow': outterFlow ?? 'col',
    };
    return p;
  };

  return <div {...props()}>{children}</div>;
}
