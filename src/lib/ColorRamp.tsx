import React from 'react';
import { UiUi } from '../UiUi';
import RampStyles from './ColorRamp.module.scss';

const fragShaderCode = `#version 300 es
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

export const UiUiColorRamp = UiUi.Element<
  UiUi.ElSettings<[]>,
  UiUi.ElValue<UiUi.T.N2>
>(
  'ColorRamp',
  ({ o, onChange }) => {
    const [values, setValues] = React.useState(o.value);
    const dSS = [0, 1, 0.01] as UiUi.T.N3;
    const stepCtrls = UiUi.XY.Step.getCtrlsFromArray({
      x: dSS,
      y: dSS,
    });
    const options = {
      autoPlay: false,
    } as UiUi.XY.Canvas.BckgdOptions;

    const withRGB = (id: string, cb: (a: number, b: number) => any) => {
      const i = 'rgb'.indexOf(id);
      return i === -1 ? null : cb(i, i + 3);
    };

    const getV = (id: string): UiUi.T.N2 =>
      withRGB(id, (a, b) => [values[a], values[b]]) ?? [0, 0];

    const setV = (id: string, v: UiUi.T.N2) =>
      withRGB(id, (a, b) => {
        values[a] = v[0];
        values[b] = v[1];
        o.value = values;
        setValues(values);
      });

    function onUpdate(id: string, vs: UiUi.T.N2) {
      setV(id, vs);
      if (onChange) onChange(o);
      if (options.callbacks?.refresh) options.callbacks.refresh();
    }

    const onUniformsUpdate: UiUi.XY.Canvas.Callback = (us) => {
      if (values)
        us.forEach((u) => (u.value = u.name === 'c' ? values : u.value));
    };

    const gHP = (id: string) => ({
      stepCtrls,
      options: { id, label: id.toUpperCase() },
      value: getV(id),
      onChange: onUpdate,
    });

    const styles = UiUi.useTheme().ns('ColorRamp');

    return (
      <div className={styles.element}>
        {UiUi.El.Label.build({ label: o.label, orientation: 'v' })}
        <UiUi.El.XY>
          <UiUi.El.XYCanvas
            {...{ fragShaderCode, onUniformsUpdate, options }}
          />
          <UiUi.El.XYHandle {...gHP('r')} />
          <UiUi.El.XYHandle {...gHP('g')} />
          <UiUi.El.XYHandle {...gHP('b')} />
        </UiUi.El.XY>
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
