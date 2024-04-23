var registry = {};
export var Config;
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
    Config.render = function (els) {
        if (!Array.isArray(els)) {
            els = [els];
        }
        var ret = [];
        els.map(function (e) {
            var reg = withElemType(e.type);
            if (reg && reg.enabled) {
                var build = reg.builder(e);
                ret.push(build);
            }
            return e;
        });
        return ret;
    };
})(Config || (Config = {}));
//# sourceMappingURL=config.js.map