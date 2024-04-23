declare const code = "#version 300 es\nprecision mediump float;\n\n#define M_PI 3.1415926535897932384626433832795\n#define M_PI2 6.2831853071795864769252867675590\n\nuniform vec2 u_resolution;\nuniform float u_time;\nout vec4 fragColor;\n\nin float test;\n\n/**\n * @uiui:panel Tiles    [ t_number,      t_zoom,     rotation    ]\n * @uiui:panel Main     [ divs,          iterations, zoom, Tiles ]\n * @uiui:panel Color >  [ ramp ]\n * @uiui:panel LFO1     [ lfo1_freq,     lfo1_iter  ]\n * @uiui:panel OSC_A    [ oscA_a_lfo1,   LFO1       ]\n * @uiui:panel LFO2     [ lfo2_freq,     lfo2_iter  ]\n * @uiui:panel OSC_B    [ oscB_a_lfo2,   LFO2       ]\n**/\n\nfloat t_number = .2;// @uiui:slider Tiles       (.1, 3., .01)\nfloat t_zoom = 1.;  // @uiui:slider Tiles Zoom  (.5, 3.,  .1)\nfloat zoom = 1.;    // @uiui:slider Global Zoom (.1, 2., .01)\nint divs = 1;       // @uiui:slider Divisions   ( 1, 16,   1)\nint iterations = 8; // @uiui:slider Iterations  ( 1, 20,   1)\nfloat rotation = .0;// @uiui:slider Rotation    (-1,  1,  .1)\n\nstruct ColRamp {\n    vec3 p;\n    vec3 i;\n};\n// vv\nfloat ramp[6] = float[6]( .1, .2, .3, 1., 1., 1.); // @uiui:color_ramp Ramping ()\n\n// @uiui:panel Tiles\nstruct Tiles {\n    float a; // @uiui:slider Ammount (0., 1., .1)\n    float z; // @uiui:slider Zoom    (0., 1., .1)\n};\n\nstruct Main {\n    int d;      // @uiui:slider Divisions (0., 1., .1)\n    int i;      // @uiui:slider Iterations (0., 1., .1)\n    float r;    // @uiui:slider Rotation (0., 1., .1)\n    Tiles t;    // @uiui:panel Tiling\n};\n\n\n// @uiui:panel Settings\nMain m = Main(\n    4, 8, .0, Tiles(.2, 1.)\n);\n\nfloat n_sin(float x) {\n    float y = x > 0. ? x : 0.;\n    return sin(x) * .5 + .5;\n}\n\nvec2 n_sin(vec2 p) {\n    return sin(p) * .5 + .5;\n}\nfloat n_tri(float x) {\n    float m1 = mod(x, .5);\n    float m2 = mod(x, 1.);\n    return m2 < .5 ?  m1 : .5 - m1;\n}\n\nvec3 getRamp(float p) {\n    return (cos((p + vec3(ramp[0], ramp[1], ramp[2])) * M_PI2) * .5 + .5 ) * vec3(ramp[3], ramp[4], ramp[5]);\n}\n\nfloat lfo1_freq = .2;   // @uiui:slider FREQ  ( 0, 1., .01 )\nfloat lfo1_iter = -.7;  // @uiui:slider DECAY (-2, 2., .01 )\nvec2 oscA_o = vec2(.3,.1);\nvec2 oscA_o_lfo1 = vec2(.2 , .2);\nfloat oscA_a_lfo1 = .25; // @uiui:slider AMP ( 0, 1., .01 )\nfloat LFO1(float s) {\n    return n_sin(u_time * lfo1_freq * M_PI + s * lfo1_iter);\n}\nvoid oscA(inout vec2 p, inout float a, float s ) {\n    float lfo1 = LFO1(s);\n    p -= oscA_o + oscA_o_lfo1 * lfo1;\n    a = atan(p.y, p.x) - M_PI * .5 + lfo1 * M_PI * oscA_a_lfo1 ;\n\n    p = vec2(cos(a), sin(a)) * length(p);\n}\n\nfloat lfo2_freq = .1; // @uiui:slider FREQ  ( 0, 1., .01 )\nfloat lfo2_iter = .5; // @uiui:slider DECAY (-2, 2., .01 )\nvec2 oscB_o = vec2(.6,.0);\nfloat oscB_o_iter = 1.2;\nvec2 oscB_o_lfo2 = vec2(.1 , -.5);\nfloat oscB_a_lfo2 = 1.; // @uiui:slider AMP ( 0, 1., .01 )\nfloat LFO2(float s) {\n    return n_sin(u_time * lfo2_freq * M_PI + s * lfo2_iter);\n}\nvoid oscB(inout vec2 p, inout float a,  float s) {\n    float lfo2 = LFO2(s) ;\n\n    vec2 tp = (oscB_o + oscB_o_lfo2 * lfo2) / (s * oscB_o_iter);\n    float tpa = atan(tp.y, tp.x) + a;\n    p -= vec2(cos(tpa), sin(tpa)) * length(tp) * (oscB_a_lfo2 * lfo2);\n    a = atan(p.y, p.x) + (M_PI );\n    p = vec2(cos(a), sin(a)) * length(p);\n    a = mod(a + M_PI2, M_PI2);\n}\n\nvoid colorize(inout vec3 col, vec2 p, float i, float a) {\n    if (p.x > 0.) {\n        float len = length(p);\n        col += ( p.y >= .0 && p.y < .002) ? vec3(.25) : vec3(.0);\n\n        col += ( p.y >= .0 && p.y < .01) ? vec3(.5 * (3. - i)) * (.05 + i * .001) : vec3(.005);\n\n        //col += ( p.y >= .0 && p.y < 0.011 && p.x > 0.) ? vec3(.1) : vec3(.0);\n\n        col += getRamp(len * (.2 * (i/(p.y < 0. ? 0.01 * len : 1.))) + n_sin(u_time * .2) + i * .6 ) * (.2 * sign(p.y*p.x*p.x) + .01);\n\n        col += ( p.y >= .0 && p.y < 0.01 / (i * .5 + 2.)) ? vec3(p.x,p.y,0) : vec3(.0);\n    }\n}\n\n\nvec3 getIteratorColor(vec2 p) {\n    vec3 col = (p.x > 0. && p.y < 0.0001) ? vec3(.1) : vec3(.0);\n    float a = 0.;\n    for (float i = 0.; i < float(iterations); i += 1.) {\n        if (mod(i, 2.) < 1.) {\n            oscA(p, a, i + 1.);\n        } else {\n            oscB(p, a, i + 1.);\n        }\n\n        colorize(col, p, i, a);\n    }\n    return col;\n}\n\nvoid getQuadrantColor(vec2 p, float a, inout vec3 col) {\n    float divS = M_PI2 / (float(divs) * 2.);\n    float l = length(p);\n    //a += sin(u_time * 2.) * (.5 - l) * .5 ;\n    a = mod(a , M_PI2);\n    float q = floor(a / divS);\n    float s = 1.;\n    for (float i = 0.; i < float(divs) * 2.; i += 1.) {\n        if (q == i) {\n            a -= i * divS - (s * .5 - .5) * divS;\n            a = mod(a, M_PI2);\n            p = vec2(cos(a), sin(a)) * l ;\n            p.y *= s;\n            col = getIteratorColor(p);\n        }\n        s *= -1.;\n    }\n}\n\nvoid main()\n{\n    vec2 p = gl_FragCoord.xy / u_resolution.x - vec2(.5) * vec2(1., u_resolution.y / u_resolution.x);\n    p *= zoom;\n    p = sin(p * M_PI2 * t_number);\n    float a = atan(p.y, p.x) + M_PI * .5 + u_time * rotation;\n    p/= t_zoom + t_number;\n    vec3 col = vec3(0.);\n    getQuadrantColor(p, a, col);\n    fragColor = vec4(col, 1.);\n}\n";
export default code;
//# sourceMappingURL=test-glsl.d.ts.map