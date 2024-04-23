import React from 'react';
import { GLSL } from 'glslcv';

const blankFragShader = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;
void main(){fragColor = vec4(vec3(0.),1.);}`;

export type UUCb = (us: GLSL.Uniform.Info[]) => void;
export type Opts = {
  autoPlay?: boolean;
  callbacks?: {
    refresh?: () => void;
  };
};
type Args = {
  fragShaderCode?: string;
  onUniformsUpdate?: UUCb;
  options?: Opts;
};

const defaultUniformsUpdater: UUCb = (us) => {};

export function UiUiCanvasBckgd({
  onUniformsUpdate = defaultUniformsUpdater,
  fragShaderCode = blankFragShader,
  options = { autoPlay: true },
}: Args) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  class FragShaderMiddleware implements GLSL.Shader.Middleware {
    private _glsl: GLSL | null = null;
    private updater: UUCb;

    constructor(private cb: UUCb) {
      this.updater = cb;
    }

    updateUniforms(us: GLSL.Uniform.Info[]) {
      this.updater(us);
    }

    set glsl(glsl: GLSL | null) {
      this._glsl = glsl;
    }

    get glsl(): GLSL | null {
      return this._glsl;
    }
  }

  const [mw] = React.useState(new FragShaderMiddleware(onUniformsUpdate));

  React.useEffect(() => {
    if (options.autoPlay !== undefined) {
      if (!('callbacks' in options)) options.callbacks = {};
      if (options.callbacks) {
        options.callbacks.refresh = () => mw.glsl?.drawFrame();
      }
    }
    if (!mw.glsl && canvasRef.current) {
      mw.glsl = GLSL.init2D(canvasRef.current)
        .addFragmentShaderMiddleware(mw)
        .setShaderSource('fragment', fragShaderCode);
      if (options.autoPlay === undefined || options.autoPlay) {
        mw.glsl.play();
      } else {
        mw.glsl.drawFrame();
      }
    }
  }, [canvasRef, mw, fragShaderCode, options]);

  return <canvas ref={canvasRef}></canvas>;
}
