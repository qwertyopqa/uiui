'use strict';

var React = require('react');
var glslcv = require('glslcv');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$d = ".UiUi-module_vars__dX-bI {\n  --single-line-height-px: 9px;\n  --label-size: 8px;\n  --label-weight: 400;\n  --label-kerning: -0.04em;\n  --label-color: #000;\n  --label-padding-vertical: 3px;\n  --label-padding-horizontal: 0px;\n  --value-size: 8px;\n  --value-weight: 600;\n  --value-kerning: -0.06em;\n  --value-color: #000;\n  --value-padding-vertical: 3px;\n  --value-padding-horizontal: 0px;\n  --panel-background: radial-gradient(\n    circle at 50% 0,\n    rgb(140, 155, 155, 0.5),\n    rgb(200, 200, 250, 0.1) 70.71%\n  ),\n   rgba(71, 71, 34, 0.4);\n  --panel-shadow: 1px 2px 5px rgba(0,0,0,0.6); }\n\n.UiUi-module_uiUiRoot__5TLZo {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px; }\n  .UiUi-module_uiUiRoot__5TLZo .UiUi-module_docks__WCBJG {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    right: 0px;\n    bottom: 0px;\n    display: flex;\n    flex-flow: column;\n    justify-content: space-between; }\n  .UiUi-module_uiUiRoot__5TLZo .UiUi-module_topDock__iLi6B {\n    position: relative;\n    width: 100%;\n    display: flex;\n    align-items: start; }\n  .UiUi-module_uiUiRoot__5TLZo .UiUi-module_bottomDock__toQ46 {\n    position: relative;\n    width: 100%;\n    display: flex;\n    align-items: end; }\n";
var styles$9 = {"vars":"UiUi-module_vars__dX-bI","uiUiRoot":"UiUi-module_uiUiRoot__5TLZo","docks":"UiUi-module_docks__WCBJG","topDock":"UiUi-module_topDock__iLi6B","bottomDock":"UiUi-module_bottomDock__toQ46"};
styleInject(css_248z$d);

var css_248z$c = ".GlobalLayer-module_utilLayer__IJ3tF {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1000;\n  background-color: rgba(0, 0, 0, 0);\n  display: none; }\n  .GlobalLayer-module_utilLayer__IJ3tF[role=\"dragging\"] {\n    display: block;\n    cursor: grabbing; }\n";
var styles$8 = {"utilLayer":"GlobalLayer-module_utilLayer__IJ3tF"};
styleInject(css_248z$c);

var _singleton = null;
var UtilLayer;
(function (UtilLayer) {
    function getSingleton() {
        return _singleton;
    }
    UtilLayer.getSingleton = getSingleton;
    function setRole(role) {
        if (_singleton === null)
            return;
        _singleton.setAttribute('role', role);
    }
    UtilLayer.setRole = setRole;
    function resetRole() {
        if (_singleton === null)
            return;
        _singleton.setAttribute('role', '');
    }
    UtilLayer.resetRole = resetRole;
})(UtilLayer || (UtilLayer = {}));
function UiUiUtilLayer() {
    var ref = React__namespace.useRef(null);
    React__namespace.useEffect(function () {
        _singleton = ref.current;
    }, [ref]);
    return React__namespace.createElement("div", { ref: ref, className: styles$8.utilLayer });
}

var registry = {};
var Config;
(function (Config) {
    function register(e, k, b) {
        registry[e.name] = {
            cfgKey: k,
            elem: e,
            builder: b,
            enabled: false,
        };
        return registry;
    }
    Config.register = register;
    Config.enable = function (e) {
        if (!Array.isArray(e))
            e = [e];
        e.map(function (c) {
            registry[c.name].enabled = true;
            return c;
        });
    };
    var withElemType = function (t) {
        var name = '';
        Object.keys(registry).map(function (key) {
            if (registry[key].cfgKey === t) {
                name = key;
            }
            return key;
        });
        return registry[name];
    };
    Config.process = function (data) {
        var tmp = {};
        Object.keys(data.panels).map(function (key) {
            var p = data.panels[key];
            tmp[key] = {
                type: 'panel',
                label: p.label,
                settings: {
                    flow: p.orientation === 'V' ? 'vertical' : 'horizontal',
                },
                value: [],
                cn: p.children,
                r: true,
            };
            return key;
        });
        Object.keys(tmp).map(function (key) {
            var p = tmp[key];
            p.cn.map(function (k) {
                if (tmp[k]) {
                    p.value.push(tmp[k]);
                    tmp[k].r = false;
                }
                else if (data.elements[k]) {
                    var e = data.elements[k];
                    e.settings = e.args;
                    p.value.push(e);
                }
                return k;
            });
            return key;
        });
        var ret = [];
        Object.keys(tmp).map(function (key) {
            return tmp[key].r ? ret.push(tmp[key]) : 0;
        });
        return ret;
    };
    Config.render = function (els, onChange) {
        if (!Array.isArray(els)) {
            els = [els];
        }
        var ret = [];
        els.map(function (e) {
            var reg = withElemType(e.type);
            if (reg && reg.enabled) {
                var build = reg.builder(e, onChange);
                ret.push(build);
            }
            return e;
        });
        return ret;
    };
})(Config || (Config = {}));

function RootElem(_a) {
    var data = _a.data, top = _a.top, bottom = _a.bottom, _b = _a.defaultDock, defaultDock = _b === void 0 ? 'B' : _b;
    var _c = React.useState([]), tElems = _c[0], setTElems = _c[1];
    var _d = React.useState([]), bElems = _d[0], setBElems = _d[1];
    function onChange(o) {
        console.log(o);
    }
    var pushElems = React.useCallback(function (els, dock) {
        if (dock === 'T') {
            setTElems(__spreadArray(__spreadArray([], tElems, true), els, true));
        }
        else {
            setBElems(__spreadArray(__spreadArray([], bElems, true), els, true));
        }
    }, [tElems, bElems]);
    React.useEffect(function () {
        if (data === null && top === null && bottom === null)
            return;
        if (data !== null) {
            var pdata = Array.isArray(data) ? data : Config.process(data);
            if (defaultDock === 'B') {
                setBElems(Config.render(pdata, onChange));
            }
            else {
                setTElems(Config.render(pdata, onChange));
            }
        }
        if (top) {
            var pdata = Array.isArray(top) ? top : Config.process(top);
            pushElems(Config.render(pdata, onChange), 'T');
        }
        if (bottom) {
            var pdata = Array.isArray(bottom) ? bottom : Config.process(bottom);
            pushElems(Config.render(pdata, onChange), 'B');
        }
    }, [data, bottom, top, defaultDock]);
    return (React.createElement("div", { className: "".concat(styles$9.uiUiRoot, " ").concat(styles$9.vars) },
        React.createElement(UiUiUtilLayer, null),
        React.createElement("div", { className: styles$9.docks },
            React.createElement("div", { rel: "dock", className: styles$9.topDock }, tElems),
            React.createElement("div", { rel: "dock", className: styles$9.bottomDock }, bElems))));
}
RootElem.withData = function (data) { return React.createElement(RootElem, { data: data }); };

var css_248z$b = ".Panel-module_uiPanel__SfZYo {\n  position: relative;\n  border: 0;\n  border-radius: 3px;\n  margin: 2px;\n  padding: 3px;\n  background: var(--panel-background);\n  box-shadow: var(--panel-shadow);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  display: inline-flex;\n  flex-flow: column; }\n  .Panel-module_uiPanel__SfZYo:before {\n    position: absolute;\n    content: \"\";\n    top: 1px;\n    left: 1px;\n    right: 1px;\n    bottom: 1px;\n    border-radius: 3px;\n    border: 0.01em solid rgba(255, 255, 25, 0.2); }\n  .Panel-module_uiPanel__SfZYo > label {\n    display: flex;\n    align-items: center;\n    font-size: 7px;\n    margin: 0 0 0 1px;\n    text-transform: uppercase;\n    pointer-events: none;\n    color: #fff; }\n    .Panel-module_uiPanel__SfZYo > label > span {\n      display: inline-block;\n      background: rgba(255, 255, 255, 0.3);\n      flex-grow: 1;\n      height: 1px;\n      margin-left: 5px; }\n";
var styles$7 = {"uiPanel":"Panel-module_uiPanel__SfZYo"};
styleInject(css_248z$b);

var css_248z$a = ".Group-module_uiGroup__l-45E {\n  display: inline-flex;\n  flex-flow: column;\n  align-items: stretch;\n  margin: 0;\n  width: 100%;\n  min-width: 50px; }\n  .Group-module_uiGroup__l-45E[data-flow=\"row\"] {\n    flex-flow: row;\n    align-items: center; }\n  .Group-module_uiGroup__l-45E > [rel=\"panel\"] {\n    margin: 3px 0 0 0;\n    padding: 0 0 0 4px;\n    background: none;\n    border-top: none;\n    border-right: none;\n    border-bottom: none;\n    border-left: 1px solid #aaa;\n    border-radius: 0; }\n  .Group-module_uiGroup__l-45E > * {\n    margin: 3px 0 0; }\n";
var styles$6 = {"uiGroup":"Group-module_uiGroup__l-45E"};
styleInject(css_248z$a);

function UiUiGroup(_a) {
    var children = _a.children, flow = _a.flow;
    return (React.createElement("div", { className: styles$6.uiGroup, "data-flow": flow !== null && flow !== void 0 ? flow : 'col' }, children));
}

function UiUiPanel(_a) {
    var o = _a.o, onChange = _a.onChange;
    var _b = React.useState([]), children = _b[0], setChildren = _b[1];
    React.useEffect(function () {
        setChildren(Config.render(o.value, onChange));
    }, [o]);
    return (React.createElement("div", { className: styles$7.uiPanel, rel: "panel" },
        React.createElement("label", null,
            o.label,
            React.createElement("span", null, "\u00A0")),
        React.createElement(UiUiGroup, { flow: o.settings.flow }, children)));
}
Config.register(UiUiPanel, 'panel', function (o, onChange) {
    var obj = o;
    obj.type = 'panel';
    if (obj.settings === undefined)
        obj.settings = { flow: 'row' };
    if (obj.settings.flow === undefined)
        obj.settings.flow = 'row';
    return React.createElement(UiUiPanel, { key: o.label, o: obj, onChange: onChange });
});

var css_248z$9 = ".styles-module_container__QLNlc {\n  display: flex; }\n";
var mainStyles = {"container":"styles-module_container__QLNlc"};
styleInject(css_248z$9);

var styles$5 = {
    main: mainStyles,
};
var Styles;
(function (Styles) {
    Styles.of = function (name) {
        return styles$5[name];
    };
    Styles.register = function (name, style) {
        styles$5[name] = style;
    };
})(Styles || (Styles = {}));

var css_248z$8 = ".Slider-module_uiSlider__YwhAE {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  width: 100%;\n  min-height: var(--single-line-height-px);\n  background: rgba(255, 255, 255, 0.6);\n  border-radius: 1px; }\n  .Slider-module_uiSlider__YwhAE .Slider-module_uiSliderFlexContainer__fjv3E {\n    position: relative;\n    display: flex;\n    width: 100%;\n    padding: 0px 3px; }\n  .Slider-module_uiSlider__YwhAE label {\n    color: var(--label-color);\n    font-size: var(--label-size);\n    font-weight: var(--label-weight);\n    letter-spacing: var(--label-kerning);\n    padding: var(--label-padding-vertical) var(--label-padding-horizontal);\n    pointer-events: none; }\n  .Slider-module_uiSlider__YwhAE input[type=\"range\"] {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    background-color: transparent;\n    /* reset */\n    -webkit-appearance: none;\n    appearance: none;\n    outline: none;\n    cursor: pointer; }\n    .Slider-module_uiSlider__YwhAE input[type=\"range\"]::-webkit-slider-thumb {\n      width: 1px;\n      height: 10px;\n      background: rgba(0, 0, 0, 0);\n      -webkit-appearance: none;\n      appearance: none; }\n    .Slider-module_uiSlider__YwhAE input[type=\"range\"]::-moz-range-thumb {\n      width: 1px;\n      height: 10px;\n      background: rgba(0, 0, 0, 0); }\n  .Slider-module_uiSlider__YwhAE .Slider-module_uiSliderValue__MMPpC {\n    color: var(--value-color);\n    font-size: var(--value-size);\n    font-weight: var(--value-weight);\n    letter-spacing: var(--value-kerning);\n    padding: var(--value-padding-vertical) var(--value-padding-horizontal);\n    text-align: right;\n    flex-grow: 1;\n    min-width: 15px;\n    margin-left: 5px;\n    pointer-events: none; }\n\n.Slider-module_uiSliderThumbReplacement__90u-6 {\n  --width: 0%;\n  position: absolute;\n  top: 1px;\n  bottom: 1px;\n  left: 1px;\n  width: calc(var(--width) - 2px);\n  margin: 0;\n  background: rgba(255, 255, 255, 0.8);\n  pointer-events: none;\n  transition: width 0.05s ease-in-out; }\n";
var sliderStyles = {"uiSlider":"Slider-module_uiSlider__YwhAE","uiSliderFlexContainer":"Slider-module_uiSliderFlexContainer__fjv3E","uiSliderValue":"Slider-module_uiSliderValue__MMPpC","uiSliderThumbReplacement":"Slider-module_uiSliderThumbReplacement__90u-6"};
styleInject(css_248z$8);

Styles.register('Slider', sliderStyles);
function pcent(s, v) {
    var a = v - s[0];
    var b = s[1] - s[0];
    return "".concat((a / b) * 100, "%");
}
function UiUiSlider(_a) {
    var o = _a.o, onChange = _a.onChange;
    var thumbRef = React.useRef(null);
    var _b = React.useState(o.value[0]), value = _b[0], setValue = _b[1];
    var _c = React.useState([0, 1, 0.01]), props = _c[0], setProps = _c[1];
    function prop(i) {
        return props[i] ? props[i] : 0;
    }
    React.useEffect(function () {
        var _a;
        var s = o.settings;
        var v = o.value[0];
        setProps(s);
        setValue(v);
        (_a = thumbRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty('--width', pcent(s, v));
    }, [o]);
    function beforeOnChange(e) {
        var _a;
        var v = Number(e.target.value);
        o.value[0] = v;
        setValue(v);
        (_a = thumbRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty('--width', pcent(props, v));
        if (onChange)
            onChange(o);
    }
    var styles = Styles.of('Slider');
    return (React.createElement("div", { className: styles.uiSlider },
        React.createElement("div", { ref: thumbRef, className: styles.uiSliderThumbReplacement }),
        React.createElement("div", { className: styles.uiSliderFlexContainer },
            React.createElement("label", { htmlFor: o.label }, o.label),
            React.createElement("div", { className: styles.uiSliderValue }, value)),
        React.createElement("input", { type: "range", name: o.label, min: prop(0), max: prop(1), step: prop(2), value: value, onChange: beforeOnChange })));
}
Config.register(UiUiSlider, 'slider', function (o, onChange) {
    var obj = o;
    var s = o.settings;
    obj.type = 'slider';
    obj.settings = Array.isArray(s)
        ? s
        : [s.min, s.max, s.step];
    obj.value = Array.isArray(o.value) ? o.value : [o.value];
    return React.createElement(UiUiSlider, { key: obj.label, o: obj, onChange: onChange });
});

var N;
(function (N) {
    N.radToAngle = function (a) { return (a / (2 * Math.PI)) * 360; };
    N.ev = function (c) { return (c ? 1 : 0); };
})(N || (N = {}));
function V2(x, y) {
    if (y === void 0) { y = null; }
    x = typeof x === 'boolean' ? (x ? 1 : 0) : x;
    y = typeof y === 'boolean' ? (y ? 1 : 0) : y;
    y = y !== null && y !== void 0 ? y : x;
    return { x: x, y: y };
}
V2.add = function (a, b) { return V2(a.x + b.x, a.y + b.y); };
V2.times = function (a, b) { return a.x * b.x + a.y * b.y; };
V2.fromRad = function (a, radius) {
    if (radius === void 0) { radius = 1; }
    radius = typeof radius === 'number' ? V2(radius) : radius;
    return V2(radius.x * Math.cos(a), radius.y * Math.sin(a));
};
V2.str = function (v) { return "".concat(v.x, " ").concat(v.y); };
function M2(a, b) {
    return { a: a, b: b };
}
M2.times = function (m, c) { return V2(V2.times(m.a, c), V2.times(m.b, c)); };
M2.radToRot = function (a) {
    return M2(V2(Math.cos(a), -Math.sin(a)), V2(Math.sin(a), Math.cos(a)));
};

function ellipse(c, r, aS, aD, phi) {
    if (phi === void 0) { phi = 0; }
    c = typeof c === 'number' ? V2(c) : c;
    r = typeof r === 'number' ? V2(r) : r;
    var rM = M2.radToRot(phi);
    var s = V2.add(c, M2.times(rM, V2.fromRad(aS, r)));
    var e = V2.add(c, M2.times(rM, V2.fromRad(aS + aD, r)));
    var a = V2(aD > Math.PI, aD > 0);
    //
    var fM = V2.str(s);
    var fA = "".concat(V2.str(r), " ").concat(N.radToAngle(phi), " ").concat(V2.str(a), " ").concat(V2.str(e));
    return "M ".concat(fM, " A ").concat(fA);
}

var css_248z$7 = ".Knob-module_wrapper__tG1kL {\n  position: relative; }\n";
var KnobStyles = {"wrapper":"Knob-module_wrapper__tG1kL"};
styleInject(css_248z$7);

var css_248z$6 = ".Ruler-module_rulerWrapper__aOFAS {\n  position: absolute;\n  display: none;\n  bottom: calc(100% + 0px);\n  left: calc(50% - 50px);\n  width: 100px;\n  height: 20px;\n  --val:0%;\n  z-index: 10; }\n  .Ruler-module_rulerWrapper__aOFAS[data-show=\"block\"] {\n    display: block; }\n    .Ruler-module_rulerWrapper__aOFAS[data-show=\"block\"]:after {\n      content: \"\";\n      position: fixed;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      right: 0;\n      z-index: 100;\n      background-color: transparent;\n      cursor: none; }\n\n.Ruler-module_ruler__xykza {\n  position: absolute;\n  overflow: hidden;\n  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  --ruler-scale: 2; }\n\n.Ruler-module_rulerInner__lMd1B {\n  position: absolute;\n  top: 3px;\n  left: calc(50% - var(--val) * var(--ruler-scale));\n  width: calc(100%  * var(--ruler-scale));\n  height: calc(100% - 6px);\n  background: rgba(255, 255, 255, 0.9);\n  display: flex;\n  justify-content: space-between;\n  border: 1px solid #000; }\n  .Ruler-module_rulerInner__lMd1B > [role=\"unit\"] {\n    position: relative;\n    border-left: 1px solid #000;\n    margin-top: 10px; }\n    .Ruler-module_rulerInner__lMd1B > [role=\"unit\"]::before {\n      content: attr(data-u);\n      position: absolute;\n      width: 20px;\n      left: -10px;\n      top: -9px;\n      font-size: 7px;\n      color: #000;\n      text-align: center; }\n    .Ruler-module_rulerInner__lMd1B > [role=\"unit\"]:first-child::before {\n      left: 2px;\n      width: auto; }\n    .Ruler-module_rulerInner__lMd1B > [role=\"unit\"]:last-child::before {\n      left: auto;\n      right: 2px;\n      width: auto; }\n\n.Ruler-module_rulerIndicator__Yzc5F {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  width: 1px;\n  height: 100%;\n  background: #000; }\n  .Ruler-module_rulerIndicator__Yzc5F:before {\n    content: \"\";\n    position: absolute;\n    top: -3px;\n    left: -3px;\n    width: 0px;\n    height: 0px;\n    border-top: 6px solid #000;\n    border-left: 4px solid transparent;\n    border-right: 4px solid transparent; }\n  .Ruler-module_rulerIndicator__Yzc5F:after {\n    content: \"\";\n    position: absolute;\n    bottom: -3px;\n    left: -3px;\n    width: 0px;\n    height: 0px;\n    border-bottom: 6px solid #000;\n    border-left: 4px solid transparent;\n    border-right: 4px solid transparent; }\n";
var RulerStyles = {"rulerWrapper":"Ruler-module_rulerWrapper__aOFAS","ruler":"Ruler-module_ruler__xykza","rulerInner":"Ruler-module_rulerInner__lMd1B","rulerIndicator":"Ruler-module_rulerIndicator__Yzc5F"};
styleInject(css_248z$6);

function normalize$1(s, v) {
    return (v - s[0]) / (s[1] - s[0]);
}
function UiUiRuler(_a) {
    var value = _a.value, mms = _a.mms; _a.scale; var _c = _a.show, show = _c === void 0 ? false : _c;
    /* eslint-disable no-unused-vars */
    var rulerRef = React.useRef(null);
    var _d = React.useState(show ? 'block' : 'none'), display = _d[0], setDisplay = _d[1];
    var _e = React.useState(value); _e[0]; var setVal = _e[1];
    var _f = React.useState(0); _f[0]; var setNormalized = _f[1];
    var _g = React.useState([0, 1, 0.01]); _g[0]; var setProps = _g[1];
    /* eslint-enable no-unused-vars */
    React.useEffect(function () {
        var _a;
        setVal(value);
        setProps(mms);
        var n = normalize$1(mms, value);
        setNormalized(n);
        setDisplay(show ? 'block' : 'none');
        (_a = rulerRef.current) === null || _a === void 0 ? void 0 : _a.style.setProperty('--val', "".concat(n * 100, "%"));
    }, [value, mms, show]);
    return (React.createElement("div", { className: RulerStyles.rulerWrapper, ref: rulerRef, "data-show": display },
        React.createElement("div", { className: RulerStyles.ruler },
            React.createElement("div", { className: RulerStyles.rulerInner },
                React.createElement("div", { role: "unit", "data-u": "0" }),
                React.createElement("div", { role: "unit", "data-u": "0.25" }),
                React.createElement("div", { role: "unit", "data-u": "0.5" }),
                React.createElement("div", { role: "unit", "data-u": "0.75" }),
                React.createElement("div", { role: "unit", "data-u": "1" }))),
        React.createElement("div", { className: RulerStyles.rulerIndicator })));
}

function normalize(s, v) {
    return (v - s[0]) / (s[1] - s[0]);
}
function UiUiKnob(_a) {
    var o = _a.o, onChange = _a.onChange;
    var _b = React.useState(false), rulerShow = _b[0], setRulerShow = _b[1];
    var _c = React.useState(o.value[0]), value = _c[0], setValue = _c[1];
    var _d = React.useState(0), normalized = _d[0], setNormalized = _d[1];
    var _e = React.useState([0, 1, 0.01]), properties = _e[0], setProps = _e[1];
    React.useEffect(function () {
        setValue(o.value[0]);
        setProps(o.settings);
        setNormalized(normalize(o.settings, o.value[0]));
    }, [o]);
    var updateWithNormalizedValue = function (p) {
        p = Math.max(0, Math.min(1, p));
        setNormalized(p);
        o.value[0] = p * (properties[1] - properties[0]) + properties[0];
        setValue(o.value[0]);
        if (onChange)
            onChange(o);
    };
    var mPos = false;
    var onMouseMove = function (e) {
        if (mPos === false) {
            return (mPos = { x: e.clientX, y: e.clientY });
        }
        var diff = (e.clientX - mPos.x) * 0.005 +
            Math.round((e.clientY - mPos.y) * 50) * -0.0001;
        updateWithNormalizedValue(normalized + diff);
    };
    var onMouseUp = function (e) {
        e.preventDefault();
        setRulerShow(false);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    var onMouseDown = function (e) {
        e.preventDefault();
        setRulerShow(true);
        mPos = false;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    var r = Math.PI * 0.5;
    var full = Math.PI * 1.94;
    return (React.createElement("div", { className: KnobStyles.wrapper },
        React.createElement(UiUiRuler, { value: value, mms: properties, scale: 2, show: rulerShow }),
        React.createElement("svg", { width: "16", height: "14", onMouseDown: onMouseDown },
            React.createElement("path", { strokeWidth: "5.5", fill: "none", stroke: "#999", opacity: ".8", d: ellipse(8, 3.5, 0, full, r) }),
            React.createElement("path", { strokeWidth: "2.5", fill: "none", stroke: "#fff", d: ellipse(8, 3.2, 0, full * normalized, r) }))));
}
Config.register(UiUiKnob, 'knob', function (o, onChange) {
    var obj = o;
    var s = o.settings;
    obj.type = 'knob';
    obj.settings = Array.isArray(s)
        ? s
        : [s.min, s.max, s.step];
    obj.value = Array.isArray(o.value) ? o.value : [o.value];
    return React.createElement(UiUiKnob, { key: obj.label, o: obj, onChange: onChange });
});

var css_248z$5 = ".ColorRamp-module_uiColorRamp__5X4DB {\n  display: inline-flex;\n  flex-flow: column;\n  align-items: end;\n  position: relative;\n  min-width: 100px; }\n  .ColorRamp-module_uiColorRamp__5X4DB [role=\"handle\"] {\n    width: 9px;\n    height: 9px;\n    border-color: rgba(255, 255, 255, 0.5);\n    border-radius: 50%;\n    font-size: 8px;\n    color: #fff;\n    font-weight: 700; }\n    .ColorRamp-module_uiColorRamp__5X4DB [role=\"handle\"][data-key=\"r\"] {\n      background-color: #b00; }\n    .ColorRamp-module_uiColorRamp__5X4DB [role=\"handle\"][data-key=\"g\"] {\n      background-color: #0b0; }\n    .ColorRamp-module_uiColorRamp__5X4DB [role=\"handle\"][data-key=\"b\"] {\n      background-color: #00b; }\n\n.ColorRamp-module_uiColorRampComps__NWf5y {\n  display: inline-flex;\n  flex-flow: column;\n  align-items: end;\n  margin: 0;\n  padding: 0; }\n  .ColorRamp-module_uiColorRampComps__NWf5y > li {\n    display: flex;\n    line-height: 0.8em;\n    align-items: center; }\n\n.ColorRamp-module_uiColorRampPreview__Cg1Gy {\n  width: calc(100% - 2px);\n  height: 100px;\n  position: relative;\n  margin: 0px 2px 3px; }\n";
var styles$4 = {"uiColorRamp":"ColorRamp-module_uiColorRamp__5X4DB","uiColorRampComps":"ColorRamp-module_uiColorRampComps__NWf5y","uiColorRampPreview":"ColorRamp-module_uiColorRampPreview__Cg1Gy"};
styleInject(css_248z$5);

var css_248z$4 = ".styles-module_xy__C6Hn7 {\n  position: relative;\n  width: 100%;\n  min-width: 50px;\n  min-height: 50px; }\n  .styles-module_xy__C6Hn7 .styles-module_backgroundWrapper__s6I8d .styles-module_defaultBackground__H4M4T {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(255, 255, 255, 0.6); }\n  .styles-module_xy__C6Hn7 .styles-module_backgroundWrapper__s6I8d canvas {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0; }\n  .styles-module_xy__C6Hn7 .styles-module_handlesWrapper__vkSu9 {\n    position: absolute;\n    width: 100%;\n    height: 100%; }\n\n.styles-module_handle__ZWM1Z {\n  cursor: grab;\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 5px;\n  height: 5px;\n  left: 0;\n  top: 0;\n  border: 1px solid #000;\n  background: rgba(0, 0, 0, 0);\n  font-size: 7px;\n  color: #fff; }\n";
var styles$3 = {"xy":"styles-module_xy__C6Hn7","backgroundWrapper":"styles-module_backgroundWrapper__s6I8d","defaultBackground":"styles-module_defaultBackground__H4M4T","handlesWrapper":"styles-module_handlesWrapper__vkSu9","handle":"styles-module_handle__ZWM1Z"};
styleInject(css_248z$4);

var decimalsCount = function (n) {
    if (Math.floor(n) === n)
        return 0;
    return n.toString().split('.')[1].length || 0;
};
var fixDigits = function (n, d) {
    return n.toFixed(d) * 1;
};
var limit = function (n, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return Math.min(Math.max(n, min), max);
};
var StepCtrl = /** @class */ (function () {
    function StepCtrl(min, max, step) {
        this.min = min;
        this.max = max;
        this.step = step;
        this.range = max - min;
        this.stepDigits = decimalsCount(step);
    }
    StepCtrl.fromArray = function (a) {
        return new StepCtrl(a[0], a[1], a[2]);
    };
    StepCtrl.prototype.filter = function (v) {
        v = limit(v, this.min, this.max);
        var adj = v % this.step;
        adj = this.step - Math.abs(adj) < 0.000000001 ? 0 : adj;
        return fixDigits(v - adj, this.stepDigits);
    };
    StepCtrl.prototype.normalize = function (v) {
        v = this.filter(v);
        return fixDigits((v - this.min) / this.range, this.stepDigits);
    };
    StepCtrl.prototype.denormalize = function (v) {
        v = this.range * limit(v) + this.min;
        v = this.filter(v);
        return fixDigits(v, this.stepDigits);
    };
    return StepCtrl;
}());

function getXYCtrlsFromArray(s) {
    return {
        x: StepCtrl.fromArray(s.x),
        y: StepCtrl.fromArray(s.y),
    };
}
var grayBackground = React.createElement("div", { className: styles$3.defaultBackground });
function UiUiXYPad(_a) {
    var children = _a.children, _b = _a.background, background = _b === void 0 ? grayBackground : _b;
    return (React.createElement("div", { className: styles$3.xy },
        React.createElement("div", { className: styles$3.backgroundWrapper }, background),
        React.createElement("div", { className: styles$3.handlesWrapper }, children)));
}

var getDragabbleArea = function (el, container) {
    if (!container) {
        container = el.parentElement;
    }
    var cB = container.getBoundingClientRect();
    var eB = el.getBoundingClientRect();
    return {
        w: cB.width - eB.width,
        h: cB.height - eB.height,
        eB: eB,
        cB: cB,
    };
};
var setElemPos = function (el, pos) {
    el.style.left = "".concat(pos.x, "px");
    el.style.top = "".concat(pos.y, "px");
};

function brInfo(el) {
    var _a = el.getBoundingClientRect(), t = _a.top, l = _a.left, b = _a.bottom, r = _a.right, w = _a.width, h = _a.height;
    return { t: t, l: l, b: b, r: r, w: w, h: h };
}
function getInfo(el, p) {
    var _a = brInfo(el), t = _a.t, l = _a.l, b = _a.b, r = _a.r, w = _a.w, h = _a.h;
    return Object.assign({ t: t, l: l, b: b, r: r, w: w, h: h }, {
        pos: { x: p.x - l, y: p.y - t },
        ori: p,
    });
}
var DragDelegate = function (tgt, sets) {
    var process = function (el, ev, type) {
        ev.preventDefault();
        var info = getInfo(el, { x: ev.clientX, y: ev.clientY });
        if (sets[type])
            sets[type](info);
        if (sets.all)
            sets.all(info, type);
    };
    var onDrag = function (ev) {
        if (!sets.dragging && !sets.all)
            return;
        process(tgt, ev, 'dragging');
    };
    var onRelease = function (ev) {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', onRelease);
        if (!sets.released && !sets.all)
            return;
        process(tgt, ev, 'released');
    };
    tgt.onmousedown = function (ev) {
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', onRelease);
        if (!sets.pressed && !sets.all)
            return;
        process(tgt, ev, 'pressed');
    };
};
var DragOnParentDelegate = function (tgt, sets) {
    var parent = tgt.parentElement;
    DragDelegate(tgt, {
        all: function (info, type) {
            if (type === 'pressed') {
                UtilLayer.setRole('dragging');
            }
            else if (type === 'released') {
                UtilLayer.resetRole();
            }
            var s = { w: info.w, h: info.h };
            if (!sets.elementCenter) {
                sets.elementCenter = { x: s.w / 2, y: s.h / 2 }; // We're assumning the center of the obj is it's absolute center
            }
            var area = getDragabbleArea(tgt, parent);
            var pp = {
                x: info.ori.x - area.cB.left - sets.elementCenter.x,
                y: info.ori.y - area.cB.top - sets.elementCenter.y,
            };
            var nInfo = info;
            nInfo.normalized = {
                x: limit(pp.x / area.w),
                y: limit(pp.y / area.h),
            };
            nInfo.constrained = {
                x: nInfo.normalized.x * area.w,
                y: nInfo.normalized.y * area.h,
            };
            if (!sets.dontSetPos) {
                setElemPos(tgt, nInfo.constrained); // dunno ... should we delagate this at all?
            }
            if (sets[type])
                sets[type](nInfo);
            if (sets.all)
                sets.all(nInfo, type);
        },
    });
};

function denorm(v, c, opts) {
    v[0] = c.x.denormalize(opts.flipX ? 1 - v[0] : v[0]);
    v[1] = c.y.denormalize(opts.flipY ? 1 - v[1] : v[1]);
    return v;
}
function norm(v, c, opts) {
    var r = [c.x.normalize(v[0]), c.y.normalize(v[1])];
    return [opts.flipX ? 1 - r[0] : r[0], opts.flipY ? 1 - r[1] : r[1]];
}
function updateDisplay(v, c, e, opts) {
    if (e === null)
        return;
    var avail = getDragabbleArea(e);
    var n = norm(v, c, opts);
    setElemPos(e, {
        x: n[0] * avail.w,
        y: n[1] * avail.h,
    });
}
function processOptions(o) {
    return __assign({ id: 'default', label: '', flipY: true, flipX: false }, (o || {}));
}
function UiUiXYHandle(_a) {
    var value = _a.value, stepCtrls = _a.stepCtrls, onChange = _a.onChange, options = _a.options;
    var opts = processOptions(options);
    var xyHandleRef = React.useRef(null);
    React.useEffect(function () {
        updateDisplay(value, stepCtrls, xyHandleRef.current, opts);
    }, [value, opts, stepCtrls]);
    React.useEffect(function () {
        if (xyHandleRef.current === null)
            return;
        DragOnParentDelegate(xyHandleRef.current, {
            dontSetPos: true,
            all: function (_a) {
                var n = _a.normalized;
                var v = denorm([n.x, n.y], stepCtrls, opts);
                value[0] = v[0];
                value[1] = v[1];
                updateDisplay(value, stepCtrls, xyHandleRef.current, opts);
                if (onChange)
                    onChange(opts.id, value);
            },
        });
    }, [xyHandleRef, stepCtrls, value, onChange, opts]);
    return (React.createElement("div", { ref: xyHandleRef, className: styles$3.handle, "data-key": opts.id, role: "handle" }, opts.label));
}

var blankFragShader = "#version 300 es\nprecision highp float;\nout vec4 fragColor;\nuniform vec2 u_resolution;\nvoid main(){fragColor = vec4(vec3(0.),1.);}";
var defaultUniformsUpdater = function (us) { };
function UiUiCanvasBckgd(_a) {
    var _b = _a.onUniformsUpdate, onUniformsUpdate = _b === void 0 ? defaultUniformsUpdater : _b, _c = _a.fragShaderCode, fragShaderCode = _c === void 0 ? blankFragShader : _c, _d = _a.options, options = _d === void 0 ? { autoPlay: true } : _d;
    var canvasRef = React.useRef(null);
    var FragShaderMiddleware = /** @class */ (function () {
        function FragShaderMiddleware(cb) {
            this.cb = cb;
            this._glsl = null;
            this.updater = cb;
        }
        FragShaderMiddleware.prototype.updateUniforms = function (us) {
            this.updater(us);
        };
        Object.defineProperty(FragShaderMiddleware.prototype, "glsl", {
            get: function () {
                return this._glsl;
            },
            set: function (glsl) {
                this._glsl = glsl;
            },
            enumerable: false,
            configurable: true
        });
        return FragShaderMiddleware;
    }());
    var mw = React.useState(new FragShaderMiddleware(onUniformsUpdate))[0];
    React.useEffect(function () {
        if (options.autoPlay !== undefined) {
            if (!('callbacks' in options))
                options.callbacks = {};
            if (options.callbacks) {
                options.callbacks.refresh = function () { var _a; return (_a = mw.glsl) === null || _a === void 0 ? void 0 : _a.drawFrame(); };
            }
        }
        if (!mw.glsl && canvasRef.current) {
            mw.glsl = glslcv.GLSL.init2D(canvasRef.current)
                .addFragmentShaderMiddleware(mw)
                .setShaderSource('fragment', fragShaderCode);
            if (options.autoPlay === undefined || options.autoPlay) {
                mw.glsl.play();
            }
            else {
                mw.glsl.drawFrame();
            }
        }
    }, [canvasRef, mw, fragShaderCode, options]);
    return React.createElement("canvas", { ref: canvasRef });
}

var XY;
(function (XY) {
    XY.Pad = UiUiXYPad;
    XY.Handle = UiUiXYHandle;
    (function (Canvas) {
        Canvas.Bckgd = UiUiCanvasBckgd;
    })(XY.Canvas || (XY.Canvas = {}));
    XY.processSettings = function (d) {
        if (!Array.isArray(d))
            return d;
        return {
            x: d.slice(0, 3),
            y: d.slice(3),
        };
    };
    (function (Step) {
        Step.getCtrlsFromArray = getXYCtrlsFromArray;
    })(XY.Step || (XY.Step = {}));
})(XY || (XY = {}));

var rampShaderCode$1 = "#version 300 es\nprecision mediump float;\nfloat MPI2 = 6.2831853;\nout vec4 fragColor;\nuniform vec2 u_resolution;\nuniform float[6] c;\nvoid main(){\n  float x = gl_FragCoord.x/u_resolution.x;\n  vec3 cp = vec3(c[0],c[1],c[2]);\n  vec3 ci = vec3(c[3],c[4],c[5]);\n  vec3 c = (cos((x+(1.-cp))*MPI2)*.5+.5) * ci;\n  fragColor = vec4(c ,1.);\n}";
function UiUiColorRamp(_a) {
    var o = _a.o, onChange = _a.onChange;
    var wrapperRef = React.useRef(null);
    var _b = React.useState(o.value), values = _b[0], setValues = _b[1];
    var defStepSet = [0, 1, 0.01];
    var stepCtrls = XY.Step.getCtrlsFromArray({ x: defStepSet, y: defStepSet });
    var options = {
        autoPlay: false,
    };
    function getV(id) {
        var i = 'rgb'.indexOf(id);
        if (i === -1)
            return [0, 0];
        return [values[i], values[i + 3]];
    }
    function setV(id, v) {
        var i = 'rgb'.indexOf(id);
        if (i === -1)
            return;
        values[i] = v[0];
        values[i + 3] = v[1];
        setValues(values);
    }
    function onUpdate(id, vs) {
        var _a;
        setV(id, vs);
        o.value = values;
        if (onChange)
            onChange(o);
        if ((_a = options.callbacks) === null || _a === void 0 ? void 0 : _a.refresh)
            options.callbacks.refresh();
    }
    var onUniformsUpdate = function (us) {
        if (!values)
            return;
        us.map(function (u) {
            u.value = u.name === 'c' ? values : u.value;
            return u;
        });
    };
    return (React.createElement("div", { ref: wrapperRef, className: styles$4.uiColorRamp },
        React.createElement(XY.Pad, { className: styles$4.cr_pad, background: React.createElement(XY.Canvas.Bckgd, { fragShaderCode: rampShaderCode$1, onUniformsUpdate: onUniformsUpdate, options: options }) },
            React.createElement(XY.Handle, { options: { id: 'r', label: 'R' }, value: getV('r'), stepCtrls: stepCtrls, onChange: onUpdate }),
            React.createElement(XY.Handle, { options: { id: 'g', label: 'G' }, value: getV('g'), stepCtrls: stepCtrls, onChange: onUpdate }),
            React.createElement(XY.Handle, { options: { id: 'b', label: 'B' }, value: getV('b'), stepCtrls: stepCtrls, onChange: onUpdate }))));
}
function boot$2(o, onChange) {
    return React.createElement(UiUiColorRamp, { key: o.label, o: o, onChange: onChange });
}
Config.register(UiUiColorRamp, 'color_ramp', boot$2);

var css_248z$3 = ".Point-module_wrapper__5ujTI > label {\n  display: flex;\n  font-size: 7px;\n  margin: 0;\n  text-transform: uppercase;\n  pointer-events: none;\n  color: #fff; }\n  .Point-module_wrapper__5ujTI > label > span {\n    display: inline-block;\n    background: #ccc;\n    flex-grow: 1;\n    height: 1px;\n    margin-top: 5px;\n    margin-left: 5px; }\n\n.Point-module_xy__e-suP {\n  height: 100px; }\n";
var styles$2 = {"wrapper":"Point-module_wrapper__5ujTI","xy":"Point-module_xy__e-suP"};
styleInject(css_248z$3);

function UiUiPoint(_a) {
    var o = _a.o, onChange = _a.onChange;
    var _b = React.useState(o.value), value = _b[0], setValue = _b[1];
    var _c = React.useState(o.settings), properties = _c[0], setProperties = _c[1];
    var stepCtrls = XY.Step.getCtrlsFromArray(o.settings);
    React.useEffect(function () {
        setValue(o.value);
        setProperties(o.settings);
    }, [o]);
    function onSliderUpdate(obj) {
        o.value['XY'.indexOf(obj.label)] = obj.value[0];
        setValue(__spreadArray([], o.value, true));
        if (onChange)
            onChange(o);
    }
    function onHandleUpdate(k, v) {
        o.value[0] = v[0];
        o.value[1] = v[1];
        setValue(__spreadArray([], o.value, true));
        if (onChange)
            onChange(o);
    }
    function elO(i) {
        var label = 'XY'[i];
        var k = label.toLocaleLowerCase();
        return {
            label: label,
            value: [value[i]],
            settings: properties[k],
        };
    }
    return (React.createElement("div", { rel: "panel", className: styles$2.wrapper },
        React.createElement("label", null,
            o.label,
            React.createElement("span", null, "\u00A0")),
        React.createElement(UiUiGroup, null,
            React.createElement(XY.Pad, { className: styles$2.xy },
                React.createElement(XY.Handle, { value: value, stepCtrls: stepCtrls, onChange: onHandleUpdate })),
            React.createElement(UiUiSlider, { o: elO(0), onChange: onSliderUpdate }),
            React.createElement(UiUiSlider, { o: elO(1), onChange: onSliderUpdate })),
        React.createElement("input", { type: "hidden", name: o.label, value: value.toString() })));
}
function boot$1(o, onChange) {
    function enforceSettings(s) {
        if (!Array.isArray(s))
            return s;
        return {
            x: s.slice(0, 3),
            y: s.slice(3),
        };
    }
    o.settings = enforceSettings(o.settings);
    return React.createElement(UiUiPoint, { key: o.label, o: o, onChange: onChange });
}
Config.register(UiUiPoint, 'point', boot$1);

var css_248z$2 = ".Sine-module_uiSine__eM78m {\n  display: inline-flex;\n  flex-flow: column;\n  align-items: end;\n  position: relative; }\n  .Sine-module_uiSine__eM78m [role=\"handle\"] {\n    width: 10px;\n    height: 10px;\n    border-color: #fff; }\n";
var styles$1 = {"uiSine":"Sine-module_uiSine__eM78m"};
styleInject(css_248z$2);

var rampShaderCode = "#version 300 es\nprecision highp float;\nfloat MPI2 = 6.2831853;\nout vec4 fragColor;\nuniform vec2 u_resolution;\nuniform float[2] c;\nint yAt(int x, float hy){\n  float nx = float(x) / u_resolution.x;\n  float y = sin(nx * c[0] * MPI2) * c[1];\n  return int(y * hy + hy);\n}\nvoid main(){\n  float hy = u_resolution.y * .5;\n  int x = int(gl_FragCoord.x);\n  int y = int(gl_FragCoord.y);\n  int dy = yAt(x, hy);\n  int pdy = yAt(x-1, hy);\n  float d = min(dy, pdy) <= y && y <= max(dy, pdy) ? 1. : 0.;\n  fragColor = vec4(vec3(d),1.);\n}";
function UiUiSine(_a) {
    var o = _a.o, onChange = _a.onChange;
    var wrapperRef = React.useRef(null);
    var _b = React.useState(o.value), values = _b[0], setValues = _b[1];
    var stepCtrls = XY.Step.getCtrlsFromArray(o.settings);
    var options = {
        autoPlay: false,
    };
    function onHandleUpdate(id, v) {
        var _a;
        o.value[0] = v[0];
        o.value[1] = v[1];
        setValues(__spreadArray([], o.value, true));
        if (onChange)
            onChange(o);
        if ((_a = options.callbacks) === null || _a === void 0 ? void 0 : _a.refresh)
            options.callbacks.refresh();
    }
    var onUniformsUpdate = function (us) {
        if (!values)
            return;
        us.map(function (u) {
            u.value = u.name === 'c' ? values : u.value;
            return u;
        });
    };
    var bckgd = (React.createElement(XY.Canvas.Bckgd, { fragShaderCode: rampShaderCode, onUniformsUpdate: onUniformsUpdate, options: options }));
    return (React.createElement("div", { ref: wrapperRef, className: styles$1.uiSine },
        React.createElement(XY.Pad, { background: bckgd },
            React.createElement(XY.Handle, { value: values, stepCtrls: stepCtrls, onChange: onHandleUpdate, options: { flipX: true } }))));
}
function boot(o, onChange) {
    function enforceSettings(s) {
        if (!Array.isArray(s))
            return s;
        return {
            x: s.slice(0, 3),
            y: s.slice(3),
        };
    }
    o.settings = enforceSettings(o.settings);
    return React.createElement(UiUiSine, { key: o.label, o: o, onChange: onChange });
}
Config.register(UiUiSine, 'sine', boot);

var css_248z$1 = ".Select-module_uiSelect__uMMyH {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  width: 100%;\n  min-height: var(--single-line-height-px);\n  border-radius: 1px; }\n  .Select-module_uiSelect__uMMyH label {\n    font-size: 8px;\n    letter-spacing: -0.04em;\n    z-index: 1;\n    padding: 0px;\n    pointer-events: none;\n    color: #fff; }\n  .Select-module_uiSelect__uMMyH select {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    outline: none;\n    text-indent: 1px;\n    background: #fff;\n    border: none;\n    font-size: 9px;\n    padding: 2px 4px;\n    margin-left: 4px;\n    border-radius: 0 !important; }\n    .Select-module_uiSelect__uMMyH select:focus {\n      outline: none;\n      border: none !important; }\n";
var selectStyles = {"uiSelect":"Select-module_uiSelect__uMMyH"};
styleInject(css_248z$1);

Styles.register('Select', selectStyles);
function UiUiSelect(_a) {
    var o = _a.o, onChange = _a.onChange;
    var selectRef = React.useRef(null);
    var _b = React.useState(o.value[0]), value = _b[0], setValue = _b[1];
    function beforeOnChange(e) {
        var v = e.target.value;
        o.value[0] = v;
        setValue(v);
        if (onChange)
            onChange(o);
    }
    var styles = Styles.of('Select');
    return (React.createElement("div", { className: styles.uiSelect },
        React.createElement("label", { htmlFor: o.label }, o.label),
        React.createElement("select", { ref: selectRef, defaultValue: value, onChange: beforeOnChange }, Object.entries(o.settings).map(function (_a) {
            var key = _a[0], val = _a[1];
            return (React.createElement("option", { key: key, value: key }, val));
        }))));
}
Config.register(UiUiSelect, 'select', function (o, onChange) {
    var obj = o;
    var s = o.settings;
    obj.type = 'select';
    if (Array.isArray(s)) {
        obj.settings = {};
        s.forEach(function (el, i) {
            obj.settings[i] = el;
        });
    }
    obj.value = Array.isArray(o.value) ? o.value : ["".concat(o.value)];
    return React.createElement(UiUiSelect, { key: obj.label, o: obj, onChange: onChange });
});

var css_248z = ".styles-module_container__gistR {\n  display: flex;\n\n}\n.styles-module_glsl_canvas__GR1pD {\n  width: 100%;\n  height: 100%;\n  position: absolute\n}\n";
var styles = {"container":"styles-module_container__gistR","glsl_canvas":"styles-module_glsl_canvas__GR1pD"};
styleInject(css_248z);

var Str;
(function (Str) {
    Str.Height = function (code) { return (code.match(/\n/g) || []).length; };
    Str.HeightAt = function (code, index) {
        return Str.Height(code.substring(0, index));
    };
    Str.Splice = function (str, start, len, replacement) { return str.substring(0, start) + replacement + str.substring(start + len); };
    Str.replace = function (str, i) {
        return Str.Splice(str, i.start, i.end - i.start, i.text);
    };
    Str.FirstMatch = function (code, list) {
        var res = null;
        var key = '';
        for (var k in list) {
            var m = list[k].exec(code);
            if (m && m.index >= 0 && (!res || m.index < res.index)) {
                res = m;
                key = k;
            }
        }
        return key !== '' ? { res: res, key: key } : false;
    };
    Str.ReplaceAllButNLs = function (m) { return m.replace(/[^\n]/g, ' '); };
    Str.Location = function (before, code, off) {
        if (off === void 0) { off = { off: 0, row: 0 }; }
        var bp = function (o, r, st) { return ({
            off: o + st.off,
            row: r + st.row,
        }); };
        var s = bp(before.length, Str.Height(before), off);
        return { s: s, e: bp(code.length, Str.Height(code), s) };
    };
    Str.isNumber = function (c) { return /[^\d|.]/.exec(c) === null; };
    Str.splitArgs = function (code) {
        var args = code.replace(/[\s|\n]/g, '').split(',');
        var openPs = function (c) { return (c.match(/\(/g) || []).length; };
        var closedPs = function (c) { return (c.match(/\)/g) || []).length; };
        for (var i = 0; i < args.length; i++) {
            while (openPs(args[i]) > closedPs(args[i]) && i < args.length) {
                args[i] += ',' + args[i + 1];
                args.splice(i + 1, 1);
            }
        }
        return args;
    };
    Str.whileMatches = function (str, re, cb) {
        var m;
        if (!re.global)
            throw new Error('WhileMatches can only be ran with global Regexes');
        while ((m = re.exec(str)))
            cb(m);
    };
})(Str || (Str = {}));

var Comment;
(function (Comment) {
    Comment.L = 'L';
    Comment.S = 'S';
    Comment.M = 'M';
    Comment.process = function (code) {
        var res;
        var comments = [];
        var data = {
            L: /^\s*\/\/[/|\s]*(.*)$/m,
            S: /(?<=^[^\n]*\w.?[^\n]*)\/\/[/|\s]*(.*)$/m,
            M: /\/\*\**(.*?)\**\*\//ms,
        };
        while ((res = Str.FirstMatch(code, data))) {
            var m = res.res;
            comments.push({
                type: res.key,
                pos: Str.Location(code.substring(0, m.index), m[0]),
                content: m[1],
                raw: m[0],
            });
            code = Str.Splice(code, m.index, m[0].length, Str.ReplaceAllButNLs(m[0]));
        }
        return { comments: comments, code: code };
    };
    Comment.find = function (t, l, st, en, additional) {
        var c = l.find(function (c) {
            var is = c.type === t && c.pos.e.row >= st && c.pos.e.row <= en;
            if (is && additional)
                is = additional(c);
            return is;
        });
        return c ? c.content : false;
    };
    Comment.findL = function (l, st, en, additional) {
        return Comment.find(Comment.L, l, st, en, additional);
    };
    Comment.findS = function (l, st, en, additional) {
        return Comment.find(Comment.S, l, st, en, additional);
    };
    Comment.findM = function (l, st, en, additional) {
        return Comment.find(Comment.M, l, st, en, additional);
    };
    Comment.eachM = function (cs, cb) {
        return cs.forEach(function (c) { return c.type === Comment.M && cb(c); });
    };
})(Comment || (Comment = {}));

var Args;
(function (Args) {
    /* eslint-disable no-unused-vars */
    var TYPE;
    (function (TYPE) {
        TYPE[TYPE["NUMBER"] = 0] = "NUMBER";
        TYPE[TYPE["ID"] = 1] = "ID";
        TYPE[TYPE["FNCALL"] = 2] = "FNCALL";
        TYPE[TYPE["COMPLEX"] = 3] = "COMPLEX";
    })(TYPE = Args.TYPE || (Args.TYPE = {}));
    Args.parse = function (str) {
        var ExpressionsRe = /(?<fn>[\w]*)[\s|n]*\((?<ctt>[^(|)]*)\)/;
        var expressions = [];
        var parseType = function (str) {
            var nm;
            if ((nm = /(?<fn>[\w]*)[\s|n]*\((?<ctt>[^(|)]*)\)/.exec(str))) {
                if (nm.groups)
                    return { type: TYPE.FNCALL, value: str, keyword: nm.groups.fn };
                throw new Error("what' wrong...");
            }
            if (!/[^\d|\s|\n|.|-]/.exec(str)) {
                return { type: TYPE.NUMBER, value: str };
            }
            if ((nm = /^[\s|\n]*:\$:(?<id>\d*):\$:[\s|\n]*$/.exec(str))) {
                if (nm.groups)
                    return parseInt(nm.groups.id);
                throw new Error("what' wrong here...");
            }
            if ((nm = /^[\s|\n]*(?<kw>[a-zA-Z_]\w*)[\s|\n]*$/.exec(str))) {
                if (nm.groups)
                    return { type: TYPE.ID, value: str, keyword: nm.groups.kw };
                throw new Error("what' wrong here as well...");
            }
            return { type: TYPE.COMPLEX, value: str };
        };
        var replaceExp = function (str) {
            var re = /:\$:(?<id>\d*):\$:/;
            var m;
            while ((m = re.exec(str))) {
                if (m.groups) {
                    var k = Number(m.groups.id);
                    var rep = replaceExp(expressions[k].value);
                    str = Str.Splice(str, m.index, m[0].length, rep);
                }
                else {
                    throw new Error('no way...');
                }
            }
            return str;
        };
        var m;
        while ((m = ExpressionsRe.exec(str))) {
            if (!m.groups)
                throw new Error('wtf');
            var expId = expressions.length;
            if (m.groups.fn) {
                expressions.push(parseType(m[0]));
            }
            else {
                var tk = parseType(m.groups.ctt);
                if (typeof tk === 'object') {
                    expressions.push(tk);
                }
                else {
                    expId = tk;
                }
            }
            str = Str.Splice(str, m.index, m[0].length, ":$:".concat(expId, ":$:"));
        }
        var args = str.split(',').map(function (s) {
            var parsed = parseType(s);
            var tk = typeof parsed === 'object' ? parsed : expressions[parsed];
            tk.value = replaceExp(tk.value);
            return tk;
        });
        return args;
    };
})(Args || (Args = {}));

var Var;
(function (Var) {
    var Type;
    (function (Type) {
        Type.isNumber = function (t) {
            return ['float', 'int', 'uint'].indexOf(t) >= 0;
        };
        Type.isVec = function (t) { return ['vec2', 'vec3'].indexOf(t) >= 0; };
        Type.isBool = function (t) { return ['bool'].indexOf(t) >= 0; };
        Type.assert = function (t) {
            if (!Type.isNumber(t) && !Type.isVec(t) && !Type.isBool(t))
                throw new Error('Invalid type: ' + t);
            return Type.isNumber(t)
                ? 'number'
                : Type.isVec(t)
                    ? 'vec'
                    : Type.isBool(t)
                        ? 'bool'
                        : 'never';
        };
    })(Type = Var.Type || (Var.Type = {}));
    Var.find = function (name, list) {
        return list.find(function (v) { return v.name === name; });
    };
    Var.parse = function (code) {
        var re = /\b(?<type>float|int|uint|vec2|vec3)[\s|\n]+(?<name>.*?)[\s|\n]*(\[(?<dim>\d+)\])?[\s|\n]*=[\s|\n]?(?<value>.*)[\s|\n]?;/g;
        var ex;
        var vars = [];
        while ((ex = re.exec(code))) {
            if (!ex.groups)
                throw new Error('oh no!!');
            var _a = ex.groups, type = _a.type, name_1 = _a.name, _value = _a.value, dim = _a.dim;
            var value = _value;
            if (['vec2', 'vec3'].indexOf(type) >= 0) {
                var size = +type.substring(3, 4);
                var vre = /\((.*)\)/.exec(_value);
                if (!vre)
                    throw new Error('Unparsable Var');
                value = Args.parse(vre[1]);
                vars.push({
                    name: name_1,
                    type: type,
                    size: size,
                    value: value,
                    subtype: 'vec',
                    pos: Str.Location(code.substring(0, ex.index), ex[0]),
                });
            }
            else {
                var size = +(dim !== null && dim !== void 0 ? dim : '1');
                if (size > 1) {
                    var vre = /\((.*)\)/.exec(_value);
                    if (!vre)
                        throw new Error('Unparsable Var');
                    value = Args.parse(vre[1]);
                }
                vars.push({
                    type: type,
                    name: name_1,
                    value: value,
                    size: size,
                    subtype: Type.assert(type),
                    pos: Str.Location(code.substring(0, ex.index), ex[0]),
                });
            }
        }
        return vars;
    };
})(Var || (Var = {}));

var Struct;
(function (Struct) {
    Struct.parseDefinition = function (code) {
        var sRe = /\b(struct\b[\s|\n]*(\w*)[\s|\n]*{)(.*?)}/gs;
        var spRe = /(\w*)[\s|\n]*(\w*)[\s|\n]*;/gs;
        var structs = [];
        var m, p;
        while ((m = sRe.exec(code)) && m[0].length > 0) {
            var pos = Str.Location(code.substring(0, m.index), m[0]);
            var struct = {
                name: m[2],
                content: {
                    value: m[3],
                    pos: Str.Location(m[1], m[3], pos.s),
                },
                pos: pos,
                properties: [],
            };
            structs.push(struct);
            while ((p = spRe.exec(struct.content.value)) && p[0].length > 1) {
                var before = struct.content.value.substring(0, p.index);
                struct.properties.push({
                    type: p[1],
                    name: p[2],
                    size: 1,
                    pos: Str.Location(before, p[0], struct.content.pos.s),
                });
            }
        }
        return structs;
    };
    Struct.withName = function (list, name) {
        var s = list.find(function (s) { return s.name === name; });
        if (!s)
            throw new Error('Struct not found: ' + name);
        return s;
    };
    Struct.parseValue = function (code, type, varname, structs) {
        var struct = Struct.withName(structs, type);
        var ctt = new RegExp("^[\\s|\\n]*".concat(struct.name, "[\\s|\\n]*\\((.*)\\)"), 'sm');
        var cttEx = ctt.exec(code);
        if (!cttEx)
            throw new Error("Error Parsing Struct content for: ".concat(struct.name));
        var argsList = Str.splitArgs(cttEx[1]);
        var args = [];
        struct.properties.forEach(function (p, i) {
            var arg = argsList[i];
            if (!p.uiui || p.uiui.indexOf('@uiui') < 0) {
                args.push(arg);
                return;
            }
            var argVarName = "".concat(varname, "_").concat(p.name);
            if (Var.Type.isNumber(p.type)) {
                if (Str.isNumber(arg)) {
                    args.push({
                        name: argVarName,
                        value: arg,
                        subtype: 'number',
                        type: p.type,
                        size: p.size,
                        uiuiInstruction: p.uiui,
                        pos: p.pos,
                    });
                }
                else {
                    args.push(arg);
                }
            }
            else if (Var.Type.isVec(p.type)) {
                args.push(arg);
            }
            else {
                var argRe = /^(\w*)\(.*\)$/.exec(arg);
                if (!argRe)
                    throw new Error('Error Parsing Struct content for: ' + struct.name);
                var structVar = Struct.parseValue(arg, p.type, argVarName, structs);
                args.push(structVar);
            }
        });
        return {
            type: struct.name,
            subtype: 'struct',
            name: varname,
            value: code,
            args: args,
        };
    };
    Struct.parseDeclarations = function (code, struct, structs) {
        var declarations = [];
        var n = struct.name;
        var w = '[\\n|\\s]*';
        var re = new RegExp('\\b' + n + '\\b' + w + '?(\\w*)' + w + '=(' + w + n + '\\(.*?\\);)', 'gs');
        var ex;
        while ((ex = re.exec(code))) {
            var o = Struct.parseValue(ex[2], struct.name, ex[1], structs);
            o.pos = Str.Location(code.substring(0, ex.index), ex[0]);
            declarations.push(o);
        }
        return declarations;
    };
})(Struct || (Struct = {}));

function initData(raw) {
    var _a = Comment.process(raw), comments = _a.comments, code = _a.code;
    code = code.replace(/#if[\s\S]*?#endif/g, Str.ReplaceAllButNLs);
    code = code.replace(/#\w?.*/g, Str.ReplaceAllButNLs);
    var sDefs = Struct.parseDefinition(code);
    var vars = Var.parse(code);
    //
    var isUiUi = function (c) { return c.content.indexOf('@uiui') >= 0; };
    var getUiUi = function (st, en) {
        return Comment.findS(comments, st, en, isUiUi) ||
            Comment.findL(comments, st - 1, en, isUiUi) ||
            undefined;
    };
    sDefs.forEach(function (s) {
        s.uiui = getUiUi(s.pos.s.row, s.content.pos.s.row);
        s.properties.forEach(function (p) {
            p.uiui = getUiUi(p.pos.s.row, p.pos.e.row);
        });
    });
    vars.forEach(function (v) {
        v.uiuiInstruction = getUiUi(v.pos.s.row, v.pos.e.row);
    });
    //
    function injectIntoStruct(s) {
        if ('uiuiInstruction' in s)
            return s;
        if ('pos' in s) {
            s.uiuiInstruction = getUiUi(s.pos.s.row, s.pos.e.row);
        }
        else {
            console.log('HERE');
            var sp = s;
            var refS = Struct.withName(sDefs, sp.type);
            if (refS.uiui)
                sp.uiuiInstruction = refS.uiui;
        }
        if (s.args) {
            s.args.forEach(function (a) {
                if (typeof a === 'string')
                    return;
                if ('subtype' in a)
                    injectIntoStruct(a);
            });
        }
        return s;
    }
    var structs = [];
    sDefs.forEach(function (s) {
        Struct.parseDeclarations(code, s, sDefs).forEach(function (d) {
            return structs.push(injectIntoStruct(d));
        });
    });
    return { code: code, structs: structs, vars: vars, comments: comments };
}
function parsePanelUiUiArgs(args) {
    var r = /@uiui:panel\s*(?<name>.+?)\s*((?<flow>[V|>])\s*)?(\[\s*(?<children>.*)\s*\])?$/m.exec(args);
    if (!r || !r.groups)
        return;
    var flow = r.groups.flow === '>' ? 'row' : 'col';
    return {
        type: 'panel',
        label: r.groups.name,
        settings: { flow: flow },
        children: r.groups.children
            ? r.groups.children.replace(/\s/g, '').split(',')
            : [],
        value: [],
    };
}
function parseVarUiUiArgs(v) {
    if (!v.uiuiInstruction)
        return;
    var r = /\s*@uiui:(?<type>\w*)\s*(?<label>.*?)\s*\(\s*(?<args>.*)\s*\)/.exec(v.uiuiInstruction);
    if (!r || !r.groups) {
        if (v.uiuiInstruction) {
            var rp = parsePanelUiUiArgs(v.uiuiInstruction);
            if (rp)
                v.uiui = rp;
        }
        return;
    }
    v.uiui = {
        type: r.groups.type,
        label: r.groups.label,
        args: r.groups.args.replace(/\s/g, '').split(','),
        value: [],
    };
    var t = v.type + (v.size > 1 ? "[".concat(v.size, "]") : '');
    v.replacement = "uniform ".concat(t, " ").concat(v.name, ";");
}
function getDeclaredPanels(comments) {
    var panels = {};
    Comment.eachM(comments, function (c) {
        if (/@uiui/.test(c.content)) {
            var re = /(@uiui:panel.*)\n/g;
            var r = void 0;
            while ((r = re.exec(c.content))) {
                var panel = parsePanelUiUiArgs(r[1]);
                if (panel)
                    panels[panel.label] = panel;
            }
        }
    });
    return panels;
}
function processPanels(comments, vars) {
    var panels = getDeclaredPanels(comments);
    Object.keys(vars).forEach(function (k) {
        if (vars[k].type === 'panel') {
            panels[k] = vars[k];
            delete vars[k];
        }
    });
    var revisePanelHierarchy = function (p) {
        if (!p || !('children' in p))
            return;
        (p.children || []).forEach(function (c) {
            if (c in panels) {
                var cp = panels[c];
                delete panels[c];
                p.value.push(cp);
                revisePanelHierarchy(cp);
            }
            else if (c in vars) {
                p.value.push(vars[c]);
            }
        });
        delete p.children;
    };
    Object.keys(panels).forEach(function (name) {
        revisePanelHierarchy(panels[name]);
    });
    return Object.keys(panels).map(function (name) { return panels[name]; });
}
function processStructReplacement(s, vars) {
    var code = '';
    var rs = [];
    var as = [];
    var uniforms = [];
    if (s.uiuiInstruction) {
        vars.push(s);
        if (s.args) {
            s.args.forEach(function (a) {
                if (typeof a === 'string') {
                    as.push(a);
                }
                else {
                    as.push(a.name);
                    if (a.type === 'int' || a.type === 'float' || a.type === 'uint') {
                        var t = a.type + (a.size > 1 ? "[".concat(a.size, "]") : '');
                        rs.unshift("uniform ".concat(t, " ").concat(a.name, ";"));
                        uniforms.push({ type: a.type, name: a.name, size: a.size });
                        vars.push(a);
                    }
                    else {
                        var d = processStructReplacement(a, vars);
                        if (d.uniforms.length > 0)
                            uniforms.push.apply(uniforms, d.uniforms);
                        if (d.code)
                            rs.push(d.code + '\n');
                    }
                }
            });
        }
        if (rs.length > 0) {
            var rss = rs.join('\n');
            var ass = as.join(',');
            code = "".concat(rss, "\n").concat(s.type, " ").concat(s.name, " = ").concat(s.type, "(").concat(ass, ");");
        }
    }
    return { code: code, uniforms: uniforms };
}
function processGlslCode(raw) {
    var data = initData(raw);
    var vars = {};
    var uniforms = [];
    var replacements = [];
    data.structs.forEach(function (s) {
        var d = processStructReplacement(s, data.vars);
        if (d.code) {
            replacements.push({
                start: s.pos.s.off,
                end: s.pos.e.off,
                text: d.code,
            });
        }
        if (d.uniforms.length > 0)
            uniforms.push.apply(uniforms, d.uniforms);
    });
    data.vars.forEach(function (v) {
        parseVarUiUiArgs(v);
        if (v.uiui) {
            if (v.uiui.type === 'panel') {
                v.uiui.value = [];
                var c_1 = [];
                if (v.args) {
                    v.args.forEach(function (a) {
                        if (typeof a === 'object')
                            c_1.push(a.name);
                    });
                }
                v.uiui.children = c_1;
            }
            else {
                if (Array.isArray(v.value)) {
                    v.uiui.value = v.value.map(function (val) {
                        if (val.type === Args.TYPE.NUMBER)
                            return Number(val.value);
                        throw new Error("cannot have this value (".concat(val.value, ") inside a var to be transformed into a uiui"));
                    });
                }
                else {
                    v.uiui.value = Number(v.value);
                }
                v.uiui.settings = (v.uiui.args || []).map(function (a) { return Number(a); });
            }
            vars[v.name] = __assign({ id: v.name }, v.uiui);
        }
        if (v.replacement) {
            if ('pos' in v) {
                uniforms.push({
                    type: v.type,
                    name: v.name,
                    size: v.size,
                });
                replacements.push({
                    start: v.pos.s.off,
                    end: v.pos.e.off,
                    text: v.replacement,
                });
            }
        }
    });
    //
    var code = raw;
    replacements
        .sort(function (a, b) { return b.start - a.start; })
        .forEach(function (r) {
        code = Str.replace(code, r);
    });
    //
    return {
        uiui: processPanels(data.comments, vars),
        code: code,
        uniforms: uniforms,
    };
}

var FragShaderMiddleware = /** @class */ (function () {
    function FragShaderMiddleware() {
        this.init = false;
    }
    FragShaderMiddleware.prototype.updateUniforms = function (us) {
        var _this = this;
        if (!this.keys)
            return;
        us.forEach(function (uni) {
            if (uni.name in _this.keys)
                uni.value = _this.keys[uni.name].value;
        });
    };
    FragShaderMiddleware.prototype.setData = function (data) {
        var keys = {};
        function processPanel(panelData) {
            panelData.forEach(function (el) {
                if (el.type === 'panel') {
                    processPanel(el.value);
                }
                else {
                    keys[el.id] = el;
                }
            });
        }
        processPanel(data.uiui);
        this.keys = keys;
    };
    return FragShaderMiddleware;
}());
function UiUiCanvas(_a) {
    var code = _a.code, url = _a.url, postProcessData = _a.postProcessData;
    var _b = React.useState(code), _code = _b[0], setCode = _b[1];
    var _url = React.useState(url)[0];
    var _c = React.useState(null), uiuiJSX = _c[0], setUiuiJSX = _c[1];
    var canvasRef = React.useRef(null);
    var mw = React.useState(new FragShaderMiddleware())[0];
    React.useEffect(function () {
        if (_url) {
            fetch(_url)
                .then(function (res) { return res.text(); })
                .then(function (text) { return setCode(text); });
        }
    }, [_url]);
    React.useEffect(function () {
        if (!mw.init && canvasRef.current && _code) {
            var data = processGlslCode(_code);
            console.log(data.uiui);
            if (postProcessData)
                postProcessData(data);
            mw.setData(data);
            setUiuiJSX(RootElem.withData(data.uiui));
            glslcv.GLSL.init2D(canvasRef.current)
                .addFragmentShaderMiddleware(mw)
                .setShaderSource('fragment', data.code)
                .play();
            mw.init = true;
        }
    }, [canvasRef, _code, mw, postProcessData]);
    return (React.createElement("div", { className: styles.container },
        React.createElement("canvas", { ref: canvasRef, className: styles.glsl_canvas }),
        uiuiJSX));
}

Config.enable([
    UiUiPanel,
    UiUiSlider,
    UiUiKnob,
    UiUiColorRamp,
    UiUiPoint,
    UiUiSine,
    UiUiSelect,
]);
exports.UiUi = void 0;
(function (UiUi) {
    UiUi.Root = RootElem;
    UiUi.Canvas = UiUiCanvas;
    /* eslint-disable no-unused-vars */
    UiUi.Config = Config;
    UiUi.Styles = Styles;
    (function (Lib) {
        Lib.enable = Config.enable;
        Lib.Group = UiUiGroup;
        Lib.Panel = UiUiPanel;
        Lib.Slider = UiUiSlider;
        Lib.Knob = UiUiKnob;
        Lib.ColorRamp = UiUiColorRamp;
        Lib.Point = UiUiPoint;
        Lib.Sine = UiUiSine;
        Lib.Select = UiUiSelect;
    })(UiUi.Lib || (UiUi.Lib = {}));
})(exports.UiUi || (exports.UiUi = {}));
//# sourceMappingURL=index.js.map
