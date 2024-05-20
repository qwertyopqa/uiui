import React, { createContext } from 'react';
import { Theme } from '../Styles';

export const ThemeContext = createContext<Theme.i>(Theme.withName('base'));

type Args = { themeId: string; children: JSX.Element };

export function ThemeProvider({ themeId, children }: Args) {
  return (
    <ThemeContext.Provider value={Theme.withName(themeId)}>
      {children}
    </ThemeContext.Provider>
  );
}
