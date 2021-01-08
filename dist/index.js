"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormrop = void 0;
const react_1 = __importStar(require("react"));
function useFormrop(initState, 
/** if there is any empty value in init state and you want to fill it use this */
fillStateifEmpty) {
    /** Html Inputs design */
    const [value, setValue] = react_1.useState(() => {
        if (fillStateifEmpty) {
            const fillState = {};
            Object.entries(initState).forEach(([key, value]) => {
                if (!value.toString().length) {
                    fillState[key] = fillStateifEmpty[key];
                }
                else {
                    fillState[key] = value;
                }
            });
            return fillState;
        }
        return initState;
    });
    return [
        value,
        ({ target, }) => {
            const type = target.type;
            const key = target.name;
            let value = target.value || "";
            switch (type) {
                case "number":
                    value = parseInt(value) || "";
                    break;
                case "url":
                    value = value.startsWith("http") ? value : "";
                    break;
                case "checkbox":
                    // @ts-ignore
                    value = target.checked;
                    break;
            }
            // check for modifier 
            const modifier = target.dataset.modifier;
            if (modifier && typeof value === "string")
                value = value[modifier]();
            setValue((preState) => {
                if (key.includes(".")) {
                    const [out, inner] = key.split(".");
                    // @ts-ignore
                    return Object.assign(Object.assign({}, preState), { [out]: Object.assign(Object.assign({}, preState[out]), { [inner]: value }) });
                }
                return Object.assign(Object.assign({}, preState), { [key]: value });
            });
        },
        (value) => {
            if (value)
                setValue((prevState) => (Object.assign(Object.assign({}, prevState), value)));
        },
        (initWith = {}) => {
            setValue(Object.assign(Object.assign({}, initState), initWith));
        },
        // components
        react_1.useMemo(() => ({
            Input: (_a) => {
                var { modifier } = _a, props = __rest(_a, ["modifier"]);
                return react_1.default.createElement("input", Object.assign(Object.assign({}, props), { ["data-modifier"]: modifier }));
            },
            TextArea: (props) => react_1.default.createElement("textarea", props),
            CheckBox: (_a) => {
                var { value, default: _default, label } = _a, props = __rest(_a, ["value", "default", "label"]);
                return react_1.default.createElement(react_1.default.Fragment, {
                    children: [
                        react_1.default.createElement("input", Object.assign(Object.assign({}, props), { id: props.name, type: "checkbox", checked: value, defaultChecked: _default })),
                        react_1.default.createElement("label", {
                            htmlFor: props.name,
                            children: label,
                        }),
                    ],
                });
            },
            Selection: (_a) => {
                var { data, default: _default } = _a, props = __rest(_a, ["data", "default"]);
                return react_1.default.createElement("select", Object.assign(Object.assign({}, props), { defaultValue: _default }), Object.entries(data).map(([value, label]) => {
                    return react_1.default.createElement("option", {
                        key: value,
                        value: value,
                    }, label);
                }));
            },
            Submit: (props) => react_1.default.createElement("button", Object.assign(Object.assign({}, props), { type: "submit" })),
        }), []),
    ];
}
exports.useFormrop = useFormrop;
//# sourceMappingURL=index.js.map