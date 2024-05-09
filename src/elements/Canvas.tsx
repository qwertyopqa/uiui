import React from 'react';
import { GLSL } from 'glslcv';
import styles from './Canvas.module.css';
import { processGlslCode } from '../utils/glue/processor';
import { RootElem } from './Root';

class FragShaderMiddleware implements GLSL.Shader.Middleware {
  init: boolean = false;
  keys: any;
  updateUniforms(us: GLSL.Uniform.Info[]) {
    if (!this.keys) return;
    us.forEach((uni) => {
      if (uni.name in this.keys) uni.value = this.keys[uni.name].value;
    });
  }

  setData(data: any) {
    const keys: any = {};
    function processPanel(panelData: any) {
      panelData.forEach((el: any) => {
        if (el.type === 'panel') {
          processPanel(el.value);
        } else {
          keys[el.id] = el;
        }
      });
    }
    processPanel(data.uiui);
    this.keys = keys;
  }
}

type CodeOrUrl =
  | { code: string; url?: undefined }
  | { url: string; code?: undefined };
type Args = CodeOrUrl & { postProcessData?: (data: any) => void };

export function UiUiCanvas({ code, url, postProcessData }: Args) {
  const [_code, setCode] = React.useState(code);
  const [_url] = React.useState(url);
  const [uiuiJSX, setUiuiJSX] = React.useState<React.JSX.Element | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const [mw] = React.useState(new FragShaderMiddleware());

  React.useEffect(() => {
    if (_url) {
      fetch(_url)
        .then((res) => res.text())
        .then((text) => setCode(text));
    }
  }, [_url]);

  React.useEffect(() => {
    if (!mw.init && canvasRef.current && _code) {
      const data = processGlslCode(_code);
      if (postProcessData) postProcessData(data);
      mw.setData(data);

      setUiuiJSX(RootElem.withData(data.uiui));
      GLSL.init2D(canvasRef.current)
        .addFragmentShaderMiddleware(mw)
        .setShaderSource('fragment', data.code)
        .play();
      mw.init = true;
    }
  }, [canvasRef, _code, mw, postProcessData]);
  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.glsl_canvas}></canvas>
      {uiuiJSX}
    </div>
  );
}
