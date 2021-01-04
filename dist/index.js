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
        {
            Input: (props) => react_1.default.createElement("input", props),
            TextArea: (props) => react_1.default.createElement("textarea", props),
            CheckBox: (props) => react_1.default.createElement(react_1.default.Fragment, {
                children: [
                    react_1.default.createElement("input", Object.assign(Object.assign({}, props), { id: props.name, type: "checkbox", checked: props.value })),
                    react_1.default.createElement("label", {
                        htmlFor: props.name,
                        children: props.label,
                    }),
                ],
            }),
            Submit: (props) => react_1.default.createElement("button", Object.assign(Object.assign({}, props), { type: "submit" })),
        },
    ];
}
exports.useFormrop = useFormrop;
//# sourceMappingURL=index.js.map