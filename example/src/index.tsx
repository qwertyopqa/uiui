import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';


import { UiUi } from 'uiui';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { initTheme } from './theme/example';
initTheme();

//import { UiUiPoint } from './ui/Point';
// import sliderStyles from './ui/slider.module.scss';
// UiUi.Styles.register('Slider', sliderStyles);
// UiUi.Config.enable([UiUiPoint]);

// UiUi.GlslCanvas.processShaderCode(code);

const testData = require('./UiUi.testdata.b.json');
const router = createBrowserRouter([
  {
    path: "/from-file",
    element: <UiUi.Root data={testData} theme='example'/>,
  },
  {
    path: "/glsl/tiles",
    element: <UiUi.Canvas url="/shader.frag.glsl" theme='example'/>,
  },
  {
    path: "/glsl/threads",
    element: <UiUi.Canvas url="/threads.frag.glsl"/>,
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
