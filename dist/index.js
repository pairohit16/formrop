"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormrop = void 0;
const react_1 = require("react");
function useFormrop(initState) {
    const [value, setValue] = react_1.useState(initState);
    return [
        value,
        ({ target }) => {
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
    ];
}
exports.useFormrop = useFormrop;
//# sourceMappingURL=index.js.map