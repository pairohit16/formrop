"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormrop = void 0;
var react_1 = require("react");
function useFormrop(initState) {
    var _a = react_1.useState(initState), value = _a[0], setValue = _a[1];
    return [
        value,
        function (_a) {
            var target = _a.target;
            var type = target.type;
            var key = target.name;
            var value = target.value || "";
            switch (type) {
                case "number":
                    value = parseInt(value) || "";
                    break;
                case "url":
                    // @ts-ignore
                    value = value.startsWith("http") ? value : "";
            }
            setValue(function (preState) {
                var _a;
                return __assign(__assign({}, preState), (_a = {}, _a[key] = value, _a));
            });
        },
        function (value) {
            if (value)
                setValue(function (prevState) { return (__assign(__assign({}, prevState), value)); });
        },
        function () {
            setValue(initState);
        },
    ];
}
exports.useFormrop = useFormrop;
//# sourceMappingURL=index.js.map