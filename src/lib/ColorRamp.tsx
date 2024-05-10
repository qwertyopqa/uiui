import React from 'react';
import { UiUi } from '../UiUi';
import { SIX_NUMBERS, THREE_NUMBERS, TWO_NUMBERS } from 'utils/numbers';
import { XY } from './utils/XY';
import { UiUiLabel } from './utils/Label';

import RampStyles from './ColorRamp.module.scss';

const rampShaderCode = `#version 300 es
precision mediump float;
float MPI2 = 6.2831853;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float[6] c;
void main(){
  float x = gl_FragCoord.x/u_resolution.x;
  vec3 cp = vec3(c[0],c[1],c[2]);
  vec3 ci = vec3(c[3],c[4],c[5]);
  vec3 c = (cos((x+(1.-cp))*MPI2)*.5+.5) * ci;
  fragColor = vec4(c ,1.);
}`;

export const UiUiColorRamp = UiUi.Lib.addElement<
  UiUi.Config.Obj<'color_ramp', [], SIX_NUMBERS>
>(
  'ColorRamp',
  ({ o, onChange }) => {
    const [values, setValues] = React.useState(o.value);
    const dSS = [0, 1, 0.01] as THREE_NUMBERS;
    const stepCtrls = XY.Step.getCtrlsFromArray({
      x: dSS,
      y: dSS,
    });
    const options = {
      autoPlay: false,
    } as XY.Canvas.BckgdOptions;

    const withRGB = (id: string, cb: (a: number, b: number) => any) => {
      const i = 'rgb'.indexOf(id);
      return i === -1 ? null : cb(i, i + 3);
    };

    const getV = (id: string): TWO_NUMBERS =>
      withRGB(id, (a, b) => [values[a], values[b]]) ?? [0, 0];

    const setV = (id: string, v: TWO_NUMBERS) =>
      withRGB(id, (a, b) => {
        values[a] = v[0];
        values[b] = v[1];
        o.value = values;
        setValues(values);
      });

    function onUpdate(id: string, vs: TWO_NUMBERS) {
      setV(id, vs);
      if (onChange) onChange(o);
      if (options.callbacks?.refresh) options.callbacks.refresh();
    }

    const onUniformsUpdate: XY.Canvas.Callback = (us) => {
      if (values)
        us.forEach((u) => (u.value = u.name === 'c' ? values : u.value));
    };

    const getHandleJsx = (id: string) => (
      <XY.Handle
        options={{ id, label: id.toUpperCase() }}
        value={getV(id)}
        stepCtrls={stepCtrls}
        onChange={onUpdate}
      />
    );

    return (
      <div className={UiUi.Styles.of('ColorRamp.element')}>
        {UiUiLabel.build({ label: o.label, orientation: 'v' })}
        <XY.Pad
          background={
            <XY.Canvas.Bckgd
              fragShaderCode={rampShaderCode}
              onUniformsUpdate={onUniformsUpdate}
              options={options}
            />
          }
        >
          {getHandleJsx('r')}
          {getHandleJsx('g')}
          {getHandleJsx('b')}
        </XY.Pad>
      </div>
    );
  },
  {
    styles: RampStyles,
    builder: (Tag, mixCfg, o, opts) => (
      <Tag key={o.label} o={mixCfg} onChange={opts.onChange} />
    ),
  }
);
