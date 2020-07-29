import React, { useState } from "react";

export function useFormrop(
  initState: object
): [
  object,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  (value: object) => void,
  (value: React.SetStateAction<object>) => void
] {
  const [value, setValue] = useState(initState);
  return [
    value,
    ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
      const type = target.type;
      const key = target.name;
      let value: string | number = target.value || "";

      switch (type) {
        case "number":
          value = parseInt(value) || "";
          break;
        case "url":
          value = value.startsWith("http") ? value : "";
      }
      setValue((preState) => {
        return { ...preState, [key]: value };
      });
    },
    (value: object) => {
      if (value) setValue((prevState) => ({ ...prevState, ...value }));
    },
    () => setValue(initState),
  ];
}
