import React from 'react';
import { Config } from '../config';

import { SIX_NUMBERS, THREE_NUMBERS, TWO_NUMBERS } from 'utils/numbers';
import styles from './ColorRamp.module.scss';
import { XY } from './utils/XY';

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

type Args = Config.Args<Config.Obj<'color_ramp', [], SIX_NUMBERS>>;

export function UiUiColorRamp({ o, onChange }: Args) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [values, setValues] = React.useState(o.value);

  const defStepSet = [0, 1, 0.01] as THREE_NUMBERS;
  const stepCtrls = XY.Step.getCtrlsFromArray({ x: defStepSet, y: defStepSet });

  const options = {
    autoPlay: false,
  } as XY.Canvas.BckgdOptions;

  function getV(id: string): TWO_NUMBERS {
    const i = 'rgb'.indexOf(id);
    if (i === -1) return [0, 0];
    return [values[i], values[i + 3]];
  }

  function setV(id: string, v: TWO_NUMBERS) {
    const i = 'rgb'.indexOf(id);
    if (i === -1) return;
    values[i] = v[0];
    values[i + 3] = v[1];
    setValues(values);
  }

  function onUpdate(id: string, vs: TWO_NUMBERS) {
    setV(id, vs);
    o.value = values;
    if (onChange) onChange(o);
    if (options.callbacks?.refresh) options.callbacks.refresh();
  }

  const onUniformsUpdate: XY.Canvas.Callback = (us) => {
    if (!values) return;
    us.map((u) => {
      u.value = u.name === 'c' ? values : u.value;
      return u;
    });
  };

  return (
    <div ref={wrapperRef} className={styles.uiColorRamp}>
      <XY.Pad
        className={styles.cr_pad}
        background={
          <XY.Canvas.Bckgd
            fragShaderCode={rampShaderCode}
            onUniformsUpdate={onUniformsUpdate}
            options={options}
          />
        }
      >
        <XY.Handle
          options={{ id: 'r', label: 'R' }}
          value={getV('r')}
          stepCtrls={stepCtrls}
          onChange={onUpdate}
        />
        <XY.Handle
          options={{ id: 'g', label: 'G' }}
          value={getV('g')}
          stepCtrls={stepCtrls}
          onChange={onUpdate}
        />
        <XY.Handle
          options={{ id: 'b', label: 'B' }}
          value={getV('b')}
          stepCtrls={stepCtrls}
          onChange={onUpdate}
        />
      </XY.Pad>
    </div>
  );
}

function boot(o: Args['o'], onChange?: Args['onChange']) {
  return <UiUiColorRamp key={o.label} o={o} onChange={onChange} />;
}
Config.register(UiUiColorRamp, 'color_ramp', boot);
