import React from 'react';
import { UiUi } from '../UiUi';
import SineStyles from './Sine.module.scss';

const fragShaderCode = `#version 300 es
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

export const UiUiSine = UiUi.Element<
  UiUi.T.SETnVAL<UiUi.XY.Step.Settings, UiUi.T.N2>,
  UiUi.T.justSET<UiUi.T.N6>
>(
  'Sine',
  ({ o, onChange }) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [values, setValues] = React.useState(o.value);

    const stepCtrls = UiUi.XY.Step.getCtrlsFromArray(o.settings);

    const options = {
      autoPlay: false,
    } as UiUi.XY.Canvas.BckgdOptions;

    function onHandleUpdate(id: string, v: UiUi.T.N2) {
      o.value[0] = v[0];
      o.value[1] = v[1];
      setValues([...v]);
      if (onChange) onChange(o);
      if (options.callbacks?.refresh) options.callbacks.refresh();
    }

    const onUniformsUpdate: UiUi.XY.Canvas.Callback = (us) => {
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

    const styles = UiUi.useTheme().ns('Sine');

    const gHP = () => ({
      stepCtrls,
      value: values,
      onChange: onHandleUpdate,
      options: { flipX: true },
    });

    return (
      <div ref={wrapperRef} className={styles.element}>
        {UiUi.El.Label.build({ label: o.label, orientation: 'v' })}
        <UiUi.El.Group>
          <UiUi.El.XY>
            <UiUi.El.XYCanvas
              {...{ fragShaderCode, onUniformsUpdate, options }}
            />
            <UiUi.El.XYHandle {...gHP()} />
          </UiUi.El.XY>
        </UiUi.El.Group>
      </div>
    );
  },
  {
    styles: SineStyles,
    builder: (Tag, mixCfg, o, opts) => {
      function enforceSettings(
        s: UiUi.T.N6 | UiUi.XY.Step.Settings
      ): UiUi.XY.Step.Settings {
        if (!Array.isArray(s)) return s;
        return {
          x: s.slice(0, 3) as UiUi.T.N3,
          y: s.slice(3) as UiUi.T.N3,
        };
      }
      o.settings = enforceSettings(o.settings);
      return <Tag key={o.label} o={o} onChange={opts.onChange} />;
    },
  }
);
