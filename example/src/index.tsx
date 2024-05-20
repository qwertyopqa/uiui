import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BackWrapper } from './BackWrapper';
import { UiUiExList } from './UiUiExList';
import { UiUi } from '@opqa/uiui';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { initTheme } from './theme/example';
import testData from './UiUi.testdata.b.json';

initTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <UiUiExList><UiUi.El.Canvas url="/intro.frag.glsl" /></UiUiExList>,
  },
  {
    path: "/from-file",
    element: <BackWrapper><UiUi.El.Root data={testData}/></BackWrapper>,
  },
  {
    path: "/glsl/tiles",
    element: <BackWrapper><UiUi.El.Canvas url="/shader.frag.glsl" theme="example"/></BackWrapper>,
  },
  {
    path: "/glsl/thread",
    element: <BackWrapper><UiUi.El.Canvas url="/threads.frag.glsl" /></BackWrapper>
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
