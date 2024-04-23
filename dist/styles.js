import mainStyles from './styles.module.scss';
var styles = {
    main: mainStyles,
};
export var Styles;
(function (Styles) {
    Styles.of = function (name) {
        return styles[name];
    };
    Styles.register = function (name, style) {
        styles[name] = style;
    };
})(Styles || (Styles = {}));
//# sourceMappingURL=styles.js.map