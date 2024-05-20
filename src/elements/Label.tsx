import React from 'react';
import LabelStyles from './Label.module.scss';
import { Styles } from '../Styles';
Styles.register('Label', LabelStyles);

type UiUiLabelOrientation = 'h' | 'v';

type Args = {
  children: string;
  orientation?: UiUiLabelOrientation;
};

export type UiUiLabelProps =
  | {
      label: string;
      orientation?: UiUiLabelOrientation;
    }
  | string
  | undefined;

export function UiUiLabel({ children, orientation }: Args) {
  return (
    <label
      className={Styles.of('Label.element')}
      data-orientation={orientation ?? 'h'}
    >
      {children}
      <span>&nbsp;</span>
    </label>
  );
}

UiUiLabel.build = (o: UiUiLabelProps) => {
  if (!o) return <></>;
  if (typeof o === 'string') return !o ? <></> : <UiUiLabel>{o}</UiUiLabel>;
  if (!o.label) return <></>;
  return (
    <UiUiLabel orientation={UiUiLabel.getOrientation(o)}>{o.label}</UiUiLabel>
  );
};

UiUiLabel.getOrientation = (o: UiUiLabelProps): UiUiLabelOrientation => {
  return (
    o && typeof o === 'object' && o.orientation === 'h' ? 'h' : 'v'
  ) as UiUiLabelOrientation;
};
