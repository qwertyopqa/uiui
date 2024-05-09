import React from 'react';
import { UiUiLib } from '../lib';
import { THREE_NUMBERS, TWO_NUMBERS, SIX_NUMBERS } from 'utils/numbers';
import { XY } from './utils/XY';
import { UiUiLabel } from './utils/Label';
import { UiUiGroup } from './utils/Group';

import SineStyles from './Sine.module.scss';
import { Styles } from '../styles';
Styles.register('Sine', SineStyles);

const rampShaderCode = `#version 300 es
precision highp float;
float MPI2 = 6.2831853;
out vec4 fragColor;
uniform vec2 u_resolution;
uniform float[2] c;
int yAt(int x, float hy){
  float nx = float(x) / u_resolution.x;
  float y = sin(nx * c[0] * MPI2) * c[1];
  return int(y * hy + hy);
}
void main(){
  float hy = u_resolution.y * .5;
  int x = int(gl_FragCoord.x);
  int y = int(gl_FragCoord.y);
  int dy = yAt(x, hy);
  int pdy = yAt(x-1, hy);
  float d = min(dy, pdy) <= y && y <= max(dy, pdy) ? 1. : 0.;
  fragColor = vec4(vec3(d),1.);
}`;

type C = UiUiLib.Props<
  {
    type?: 'sine';
    label: string;
    settings: XY.Step.Settings;
    value: TWO_NUMBERS;
  },
  {
    settings: SIX_NUMBERS;
  }
>;

export const UiUiSine = UiUiLib.El<C>(
  ({ o, onChange }) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [values, setValues] = React.useState(o.value);

    const stepCtrls = XY.Step.getCtrlsFromArray(o.settings);

    const options = {
      autoPlay: false,
    } as XY.Canvas.BckgdOptions;

    function onHandleUpdate(id: string, v: TWO_NUMBERS) {
      o.value[0] = v[0];
      o.value[1] = v[1];
      setValues([...v]);
      if (onChange) onChange(o);
      if (options.callbacks?.refresh) options.callbacks.refresh();
    }

    const onUniformsUpdate: XY.Canvas.Callback = (us) => {
      if (!values) return;
      const v = [
        ((values[0] - stepCtrls.x.min) / stepCtrls.x.max) * 3.0 + 1.0,
        values[1],
      ];
      us.map((u) => {
        u.value = u.name === 'c' ? v : u.value;
        return u;
      });
    };

    const bckgd = (
      <XY.Canvas.Bckgd
        fragShaderCode={rampShaderCode}
        onUniformsUpdate={onUniformsUpdate}
        options={options}
      />
    );

    return (
      <div ref={wrapperRef} className={Styles.of('Sine.element')}>
        {UiUiLabel.build({ label: o.label, orientation: 'v' })}
        <UiUiGroup>
          <XY.Pad background={bckgd}>
            <XY.Handle
              value={values}
              stepCtrls={stepCtrls}
              onChange={onHandleUpdate}
              options={{ flipX: true }}
            />
          </XY.Pad>
        </UiUiGroup>
      </div>
    );
  },
  {
    id: 'sine',
    tag: 'Sine',
    styles: SineStyles,
    builder: (Tag, mixedConfig, opts) => {
      function enforceSettings(
        s: SIX_NUMBERS | XY.Step.Settings
      ): XY.Step.Settings {
        if (!Array.isArray(s)) return s;
        return {
          x: s.slice(0, 3) as THREE_NUMBERS,
          y: s.slice(3) as THREE_NUMBERS,
        };
      }
      const o = mixedConfig as any as C['Main'];
      o.settings = enforceSettings(o.settings);
      return <Tag key={o.label} o={o} onChange={opts.onChange} />;
    },
  }
);

/*
const builder: Config.Builder<Obj, Alt> = (o, opts) => {
  function enforceSettings(
    s: SIX_NUMBERS | XY.Step.Settings
  ): XY.Step.Settings {
    if (!Array.isArray(s)) return s;
    return {
      x: s.slice(0, 3) as THREE_NUMBERS,
      y: s.slice(3) as THREE_NUMBERS,
    };
  }
  o.settings = enforceSettings(o.settings);
  return <UiUiSine key={o.label} o={o as Obj} onChange={opts.onChange} />;
};

Config.register(UiUiSine, 'sine', builder);
*/
