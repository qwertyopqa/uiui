const code = `#version 300 es
precision mediump float;

#define M_PI 3.1415926535897932384626433832795
#define M_PI2 6.2831853071795864769252867675590

uniform vec2 u_resolution;
uniform float u_time;
out vec4 fragColor;

in float test;

/**
 * @uiui:Panel Tiles    [ t_number,      t_zoom,     rotation    ]
 * @uiui:Panel Main     [ divs,          iterations, zoom, Tiles ]
 * @uiui:Panel Color >  [ ramp ]
 * @uiui:Panel LFO1     [ lfo1_freq,     lfo1_iter  ]
 * @uiui:Panel OSC_A    [ oscA_a_lfo1,   LFO1       ]
 * @uiui:Panel LFO2     [ lfo2_freq,     lfo2_iter  ]
 * @uiui:Panel OSC_B    [ oscB_a_lfo2,   LFO2       ]
**/

float t_number = .2;// @uiui:Slider Tiles       (.1, 3., .01)
float t_zoom = 1.;  // @uiui:Slider Tiles Zoom  (.5, 3.,  .1)
float zoom = 1.;    // @uiui:Slider Global Zoom (.1, 2., .01)
int divs = 1;       // @uiui:Slider Divisions   ( 1, 16,   1)
int iterations = 8; // @uiui:Slider Iterations  ( 1, 20,   1)
float rotation = .0;// @uiui:Slider Rotation    (-1,  1,  .1)

struct ColRamp {
    vec3 p;
    vec3 i;
};
// vv
float ramp[6] = float[6]( .1, .2, .3, 1., 1., 1.); // @uiui:color_ramp Ramping ()

// @uiui:Panel Tiles
struct Tiles {
    float a; // @uiui:Slider Ammount (0., 1., .1)
    float z; // @uiui:Slider Zoom    (0., 1., .1)
};

struct Main {
    int d;      // @uiui:Slider Divisions (0., 1., .1)
    int i;      // @uiui:Slider Iterations (0., 1., .1)
    float r;    // @uiui:Slider Rotation (0., 1., .1)
    Tiles t;    // @uiui:Panel Tiling
};


// @uiui:Panel Settings
Main m = Main(
    4, 8, .0, Tiles(.2, 1.)
);

float n_sin(float x) {
    float y = x > 0. ? x : 0.;
    return sin(x) * .5 + .5;
}

vec2 n_sin(vec2 p) {
    return sin(p) * .5 + .5;
}
float n_tri(float x) {
    float m1 = mod(x, .5);
    float m2 = mod(x, 1.);
    return m2 < .5 ?  m1 : .5 - m1;
}

vec3 getRamp(float p) {
    return (cos((p + vec3(ramp[0], ramp[1], ramp[2])) * M_PI2) * .5 + .5 ) * vec3(ramp[3], ramp[4], ramp[5]);
}

float lfo1_freq = .2;   // @uiui:Slider FREQ  ( 0, 1., .01 )
float lfo1_iter = -.7;  // @uiui:Slider DECAY (-2, 2., .01 )
vec2 oscA_o = vec2(.3,.1);
vec2 oscA_o_lfo1 = vec2(.2 , .2);
float oscA_a_lfo1 = .25; // @uiui:Slider AMP ( 0, 1., .01 )
float LFO1(float s) {
    return n_sin(u_time * lfo1_freq * M_PI + s * lfo1_iter);
}
void oscA(inout vec2 p, inout float a, float s ) {
    float lfo1 = LFO1(s);
    p -= oscA_o + oscA_o_lfo1 * lfo1;
    a = atan(p.y, p.x) - M_PI * .5 + lfo1 * M_PI * oscA_a_lfo1 ;

    p = vec2(cos(a), sin(a)) * length(p);
}

float lfo2_freq = .1; // @uiui:Slider FREQ  ( 0, 1., .01 )
float lfo2_iter = .5; // @uiui:Slider DECAY (-2, 2., .01 )
vec2 oscB_o = vec2(.6,.0);
float oscB_o_iter = 1.2;
vec2 oscB_o_lfo2 = vec2(.1 , -.5);
float oscB_a_lfo2 = 1.; // @uiui:Slider AMP ( 0, 1., .01 )
float LFO2(float s) {
    return n_sin(u_time * lfo2_freq * M_PI + s * lfo2_iter);
}
void oscB(inout vec2 p, inout float a,  float s) {
    float lfo2 = LFO2(s) ;

    vec2 tp = (oscB_o + oscB_o_lfo2 * lfo2) / (s * oscB_o_iter);
    float tpa = atan(tp.y, tp.x) + a;
    p -= vec2(cos(tpa), sin(tpa)) * length(tp) * (oscB_a_lfo2 * lfo2);
    a = atan(p.y, p.x) + (M_PI );
    p = vec2(cos(a), sin(a)) * length(p);
    a = mod(a + M_PI2, M_PI2);
}

void colorize(inout vec3 col, vec2 p, float i, float a) {
    if (p.x > 0.) {
        float len = length(p);
        col += ( p.y >= .0 && p.y < .002) ? vec3(.25) : vec3(.0);

        col += ( p.y >= .0 && p.y < .01) ? vec3(.5 * (3. - i)) * (.05 + i * .001) : vec3(.005);

        //col += ( p.y >= .0 && p.y < 0.011 && p.x > 0.) ? vec3(.1) : vec3(.0);

        col += getRamp(len * (.2 * (i/(p.y < 0. ? 0.01 * len : 1.))) + n_sin(u_time * .2) + i * .6 ) * (.2 * sign(p.y*p.x*p.x) + .01);

        col += ( p.y >= .0 && p.y < 0.01 / (i * .5 + 2.)) ? vec3(p.x,p.y,0) : vec3(.0);
    }
}


vec3 getIteratorColor(vec2 p) {
    vec3 col = (p.x > 0. && p.y < 0.0001) ? vec3(.1) : vec3(.0);
    float a = 0.;
    for (float i = 0.; i < float(iterations); i += 1.) {
        if (mod(i, 2.) < 1.) {
            oscA(p, a, i + 1.);
        } else {
            oscB(p, a, i + 1.);
        }

        colorize(col, p, i, a);
    }
    return col;
}

void getQuadrantColor(vec2 p, float a, inout vec3 col) {
    float divS = M_PI2 / (float(divs) * 2.);
    float l = length(p);
    //a += sin(u_time * 2.) * (.5 - l) * .5 ;
    a = mod(a , M_PI2);
    float q = floor(a / divS);
    float s = 1.;
    for (float i = 0.; i < float(divs) * 2.; i += 1.) {
        if (q == i) {
            a -= i * divS - (s * .5 - .5) * divS;
            a = mod(a, M_PI2);
            p = vec2(cos(a), sin(a)) * l ;
            p.y *= s;
            col = getIteratorColor(p);
        }
        s *= -1.;
    }
}

void main()
{
    vec2 p = gl_FragCoord.xy / u_resolution.x - vec2(.5) * vec2(1., u_resolution.y / u_resolution.x);
    p *= zoom;
    p = sin(p * M_PI2 * t_number);
    float a = atan(p.y, p.x) + M_PI * .5 + u_time * rotation;
    p/= t_zoom + t_number;
    vec3 col = vec3(0.);
    getQuadrantColor(p, a, col);
    fragColor = vec4(col, 1.);
}
`;

export default code;
