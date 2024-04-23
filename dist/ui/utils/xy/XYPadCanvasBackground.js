import React from 'react';
import { GLSL } from 'glslcv';
var blankFragShader = "#version 300 es\nprecision highp float;\nout vec4 fragColor;\nuniform vec2 u_resolution;\nvoid main(){fragColor = vec4(vec3(0.),1.);}";
var defaultUniformsUpdater = function (us) { };
export function UiUiCanvasBckgd(_a) {
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
            mw.glsl = GLSL.init2D(canvasRef.current)
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
//# sourceMappingURL=XYPadCanvasBackground.js.map