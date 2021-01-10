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
exports.useFormropArrays = exports.useFormrop = void 0;
const react_1 = __importStar(require("react"));
function useFormrop(initState) {
    /** Html Inputs design */
    const [value, setValue] = react_1.useState(() => initState);
    return [
        value,
        ({ target, }) => {
            const type = target.type;
            const key = target.name;
            const deep = target.dataset.deep;
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
                if (deep)
                    return Object.assign(Object.assign({}, preState), { [key]: Object.assign(Object.assign({}, preState[key]), { [deep]: value }) });
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
                var { deep, modifier } = _a, props = __rest(_a, ["deep", "modifier"]);
                return react_1.default.createElement("input", Object.assign(Object.assign({}, props), { ["data-modifier"]: modifier, ["data-deep"]: deep }));
            },
            TextArea: (_a) => {
                var { deep } = _a, props = __rest(_a, ["deep"]);
                return react_1.default.createElement("textarea", Object.assign(Object.assign({}, props), { ["data-deep"]: deep }));
            },
            CheckBox: (_a) => {
                var { deep, value, label } = _a, props = __rest(_a, ["deep", "value", "label"]);
                return react_1.default.createElement(react_1.default.Fragment, {
                    children: [
                        react_1.default.createElement("input", Object.assign(Object.assign({}, props), { ["data-deep"]: deep, id: props.name, type: "checkbox", checked: value })),
                        react_1.default.createElement("label", {
                            htmlFor: props.name,
                            children: label,
                        }),
                    ],
                });
            },
            Selection: (_a) => {
                var { deep, data } = _a, props = __rest(_a, ["deep", "data"]);
                return react_1.default.createElement("select", Object.assign(Object.assign({}, props), { ["data-deep"]: deep }), Object.entries(data).map(([value, label]) => {
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
function useFormropArrays(initState) {
    /** Html Inputs design */
    const [value, setValue] = react_1.useState(() => initState);
    return [
        value,
        ({ target, }) => {
            const type = target.type;
            const name = target.name;
            const deep = target.dataset.deep;
            const index = Number(target.dataset.index);
            let value = target.value || "";
            switch (type) {
                case "number":
                    value = parseInt(value) || "";
                    break;
                case "url":
                    value = value.startsWith("http") ? value : "";
                    break;
                case "checkbox":
                    // @ts-ignore, checked is only avail for checkbox input, typescript is not working properly
                    value = target.checked;
                    break;
            }
            // check for modifier
            const modifier = target.dataset.modifier;
            if (modifier && typeof value === "string")
                value = value[modifier]();
            setValue((preState) => {
                const copy = Array.from(preState);
                if (deep) {
                    copy[index][name][deep] = value;
                }
                else
                    copy[index][name] = value;
                return copy;
            });
        },
        (value) => {
            if (Array.isArray(value))
                setValue(value);
        },
        () => {
            setValue(initState);
        },
        // components
        react_1.useMemo(() => ({
            Input: (_a) => {
                var { index, deep, modifier } = _a, props = __rest(_a, ["index", "deep", "modifier"]);
                return react_1.default.createElement("input", Object.assign(Object.assign({}, props), { ["data-modifier"]: modifier, ["data-index"]: index, ["data-deep"]: deep }));
            },
            TextArea: (_a) => {
                var { index, deep } = _a, props = __rest(_a, ["index", "deep"]);
                return react_1.default.createElement("textarea", Object.assign(Object.assign({}, props), { ["data-index"]: index, ["data-deep"]: deep }));
            },
            CheckBox: (_a) => {
                var { index, deep, value, label } = _a, props = __rest(_a, ["index", "deep", "value", "label"]);
                return react_1.default.createElement(react_1.default.Fragment, {
                    children: [
                        react_1.default.createElement("input", Object.assign(Object.assign({}, props), { ["data-index"]: index, ["data-deep"]: deep, id: props.name, type: "checkbox", checked: value })),
                        react_1.default.createElement("label", {
                            htmlFor: props.name,
                            children: label,
                        }),
                    ],
                });
            },
            Selection: (_a) => {
                var { index, deep, data } = _a, props = __rest(_a, ["index", "deep", "data"]);
                return react_1.default.createElement("select", Object.assign(Object.assign({}, props), { ["data-index"]: index, ["data-deep"]: deep }), Object.entries(data).map(([value, label]) => {
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
exports.useFormropArrays = useFormropArrays;
//# sourceMappingURL=index.js.map