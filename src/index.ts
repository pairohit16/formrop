import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";

export function useFormrop<S>(
  initState: S
): [
  S,
  (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any,
  Dispatch<SetStateAction<S>>,
  () => any
] {
  const [value, setValue] = useState(initState);
  return [
    value,
    ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): any => {
      const type = target.type;
      const key = target.name;
      let value: string | number = target.value || "";

      switch (type) {
        case "number":
          value = parseInt(value) || "";
          break;
        case "url":
          // @ts-ignore
          value = value.startsWith("http") ? value : "";
      }
      setValue((preState) => {
        return { ...preState, [key]: value };
      });
    },
    (value) => {
      if (value) setValue((prevState) => ({ ...prevState, ...value }));
    },
    () => {
      setValue(initState);
    },
  ];
}
