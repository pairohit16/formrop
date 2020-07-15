import React, { useState } from "react";

export function useFormrop(initState) {
  const [value, setValue] = useState(initState);
  return [
    value,
    ({ target }) => {
      const type = target.type;
      const key = target.name;
      let value = target.value || "";
      switch (type) {
        case "number":
          value = parseInt(value);
          break;
        case "url":
          value = value.startsWith("http") ? value : "";
      }
      setValue((preState) => {
        return { ...preState, [key]: value };
      });
    },
    (value) => {
      if (value) setValue((prevState) => ({ ...prevState, ...value }));
    },
    () => setValue(initState),
  ];
}
