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
const formRopStore = {};
function useFormrop(initState) {
    /** Html Inputs design */
    const [value, setValue] = react_1.useState(initState);
    return [
        value,
        ({ target, }) => {
            const type = target.type;
            const name = target.name;
            const deep = target.dataset.deep;
            let value = target.value || "";
            switch (type) {
                case "text":
                case "textarea":
                    value = value.length > 0 ? value : ((target.value = ""), null);
                    break;
                case "number":
                    value = parseInt(value) || ((target.value = ""), null);
                    break;
                case "url":
                    value = value.startsWith("http")
                        ? value
                        : ((target.value = ""), null);
                    break;
                case "checkbox":
                    // @ts-ignore
                    value = target.checked;
                    break;
                case "date":
                    // @ts-ignore
                    value = target.valueAsDate;
                    break;
                case "datetime-local":
                    // @ts-ignore
                    value = target.valueAsNumber;
                    break;
            }
            // check for modifier
            if (target.dataset.modifier === "true") {
                const key = name + "" + deep;
                const modifier = formRopStore[key];
                value = modifier(value);
            }
            // for date modifier
            if (target.type === "date") {
                const key = name + "" + deep;
                const fromDate = formRopStore[key];
                value = fromDate(value);
            }
            if (target.type === "datetime-local") {
                const key = name + "" + deep;
                const fromDate = formRopStore[key];
                value = fromDate(value);
            }
            setValue((preState) => {
                if (deep)
                    return Object.assign(Object.assign({}, preState), { [name]: Object.assign(Object.assign({}, preState[name]), { [deep]: value }) });
                return Object.assign(Object.assign({}, preState), { [name]: value });
            });
        },
        (value) => {
            if (value)
                setValue((prevState) => (Object.assign(Object.assign({}, prevState), value)));
        },
        (initWith = {}, merge) => {
            if (!merge) {
                // @ts-ignore
                setValue(initWith);
            }
            else {
                if (typeof initState === "function") {
                    // @ts-ignore
                    setValue(Object.assign(Object.assign({}, initState()), initWith));
                }
                else {
                    setValue(Object.assign(Object.assign({}, initState), initWith));
                }
            }
        },
        // components
        react_1.useMemo(() => ({
            Input: (_a) => {
                var { deep, modifier, placeholder, type } = _a, props = __rest(_a, ["deep", "modifier", "placeholder", "type"]);
                if (modifier) {
                    const key = props.name + "" + deep;
                    formRopStore[key] = modifier;
                }
                if (type === "url" && !placeholder) {
                    placeholder = "https://";
                }
                return react_1.default.createElement("input", Object.assign(Object.assign({ type,
                    placeholder }, props), { autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", 
                    // this is hack just to pass function or anything in native input!!
                    ["data-modifier"]: !!modifier, ["data-deep"]: deep }));
            },
            Date: (_a) => {
                var { deep, value, fromDate, toDate } = _a, props = __rest(_a, ["deep", "value", "fromDate", "toDate"]);
                const key = props.name + "" + deep;
                formRopStore[key] = fromDate;
                return react_1.default.createElement("input", Object.assign(Object.assign({}, props), { type: "date", value: toDate(value), ["data-deep"]: deep }));
            },
            DateTime: (_a) => {
                var { deep, value, fromDate, toDate } = _a, props = __rest(_a, ["deep", "value", "fromDate", "toDate"]);
                const key = props.name + "" + deep;
                formRopStore[key] = fromDate;
                return react_1.default.createElement("input", Object.assign(Object.assign({}, props), { type: "datetime-local", value: toDate(value), ["data-deep"]: deep }));
            },
            TextArea: (_a) => {
                var { deep } = _a, props = __rest(_a, ["deep"]);
                return react_1.default.createElement("textarea", Object.assign(Object.assign({}, props), { autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", ["data-deep"]: deep }));
            },
            CheckBox: (_a) => {
                var { deep, value, label } = _a, props = __rest(_a, ["deep", "value", "label"]);
                return react_1.default.createElement(react_1.default.Fragment, {
                    children: [
                        react_1.default.createElement("input", Object.assign(Object.assign({}, props), { ["data-deep"]: deep, id: props.name + "" + deep, type: "checkbox", checked: value, key: props.name + "" + deep + "input" })),
                        react_1.default.createElement("label", {
                            htmlFor: props.name + "" + deep,
                            children: label,
                            key: props.name + "" + deep + "label",
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
            Submit: (_a) => {
                var { onSubmit } = _a, props = __rest(_a, ["onSubmit"]);
                return react_1.default.createElement("button", Object.assign(Object.assign({}, props), { type: "button", onClick: () => onSubmit() }));
            },
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
                case "text":
                case "textarea":
                    value = value.length > 0 ? value : ((target.value = ""), null);
                    break;
                case "number":
                    value = parseInt(value) || ((target.value = ""), null);
                    break;
                case "url":
                    value = value.startsWith("http")
                        ? value
                        : ((target.value = ""), null);
                    break;
                case "checkbox":
                    // @ts-ignore, checked is only avail for checkbox input, typescript is not working properly
                    value = target.checked;
                    break;
                case "date":
                    // @ts-ignore
                    value = target.valueAsDate;
                    break;
                case "datetime-local":
                    // @ts-ignore
                    value = target.valueAsNumber;
            }
            // check for modifier
            if (target.dataset.modifier === "true") {
                const key = name + "" + deep;
                const modifier = formRopStore[key];
                value = modifier(value);
            }
            // for date modifier
            if (target.type === "date" || target.type === "datetime-local") {
                const key = name + "" + deep;
                const fromDate = formRopStore[key];
                value = fromDate(value);
            }
            if (target.type === "datetime-local") {
                const key = name + "" + deep;
                const fromDate = formRopStore[key];
                value = fromDate(value);
            }
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
        (initWith) => {
            setValue(initWith || []);
        },
        // components
        react_1.useMemo(() => ({
            Input: (_a) => {
                var { deep, index, modifier, placeholder, type } = _a, props = __rest(_a, ["deep", "index", "modifier", "placeholder", "type"]);
                if (modifier) {
                    const key = props.name + "" + deep;
                    formRopStore[key] = modifier;
                }
                if (type === "url" && !placeholder) {
                    placeholder = "https://";
                }
                return react_1.default.createElement("input", Object.assign(Object.assign({ type,
                    placeholder }, props), { autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", 
                    // this is hack just to pass function or anything in native input!!
                    ["data-index"]: index, ["data-modifier"]: !!modifier, ["data-deep"]: deep }));
            },
            Date: (_a) => {
                var { deep, value, index, fromDate, toDate } = _a, props = __rest(_a, ["deep", "value", "index", "fromDate", "toDate"]);
                const key = props.name + "" + deep;
                formRopStore[key] = fromDate;
                return react_1.default.createElement("input", Object.assign(Object.assign({}, props), { type: "datetime", value: toDate(value), ["data-index"]: index, ["data-deep"]: deep }));
            },
            DateTime: (_a) => {
                var { deep, value, index, fromDate, toDate } = _a, props = __rest(_a, ["deep", "value", "index", "fromDate", "toDate"]);
                const key = props.name + "" + deep;
                formRopStore[key] = fromDate;
                return react_1.default.createElement("input", Object.assign(Object.assign({}, props), { type: "datetime-local", value: toDate(value), ["data-index"]: index, ["data-deep"]: deep }));
            },
            TextArea: (_a) => {
                var { index, deep } = _a, props = __rest(_a, ["index", "deep"]);
                return react_1.default.createElement("textarea", Object.assign(Object.assign({}, props), { autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", ["data-index"]: index, ["data-deep"]: deep }));
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
            Submit: (_a) => {
                var { onSubmit } = _a, props = __rest(_a, ["onSubmit"]);
                return react_1.default.createElement("button", Object.assign(Object.assign({}, props), { type: "button", onClick: () => onSubmit() }));
            },
        }), []),
    ];
}
exports.useFormropArrays = useFormropArrays;
//# sourceMappingURL=index.js.map