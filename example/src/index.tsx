import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';


import { UiUi } from 'uiui';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import theme from './theme/vars.module.scss';
import panelStyles from './theme/panel.module.scss';

UiUi.Theme.register('MyTheme', theme.vars);
UiUi.Styles.register('Panel.Root', panelStyles.UiUiPanel_Root);
UiUi.Styles.register('Label.element', panelStyles.UiUiLabel);
// PROBABLY: UiUi.Lib.RegisterStyle('Panel.Root', panelStyles.UiUiPanel_Root);
// PROBABLY: UiUi.Lib.RegisterStyle('Panel.Root', panelStyles.UiUiPanel_Root);

//import { UiUiPoint } from './ui/Point';
// import sliderStyles from './ui/slider.module.scss';
// UiUi.Styles.register('Slider', sliderStyles);
// UiUi.Config.enable([UiUiPoint]);

// UiUi.GlslCanvas.processShaderCode(code);

const testData = require('./UiUi.testdata.b.json');
const router = createBrowserRouter([
  {
    path: "/from-file",
    element: <UiUi.Root data={testData} />,//theme="MyTheme"/>,
  },
  {
    path: "/glsl/tiles",
    element: <UiUi.Canvas url="/shader.frag.glsl" />,
  },
  {
    path: "/glsl/threads",
    element: <UiUi.Canvas url="/threads.frag.glsl" />,
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
