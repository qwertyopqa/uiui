import { Config } from './config';

import { UiUiPanel } from './lib/Panel';

Config.enable([UiUiPanel]);

export namespace UiUiLib {
  export const Panel = UiUiPanel;
}
