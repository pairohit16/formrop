import React, { useState, ChangeEvent } from "react";

export function useFormrop<S>(
  initState: S,
  /** if there is any empty value in init state and you want to fill it use this */
  fillStateifEmpty?: S
): [
    S,
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void,
    (key: Partial<S>) => void,
    (initWith?: Partial<S>) => void,
    {
      Input: (props: {
        type: "url" | "text";
        name: keyof S;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        disabled?: boolean | undefined;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      TextArea: (props: {
        name: keyof S;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        disabled?: boolean;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >;
      CheckBox: (props: {
        label: string;
        name: keyof S;
        value: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      Submit: (props: {
        disabled?: boolean;
        children?: string;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
    }
  ] {
  /** Html Inputs design */

  const [value, setValue] = useState(() => {
    if (fillStateifEmpty) {
      const fillState = {};
      Object.entries(initState).forEach(([key, value]) => {
        if (!value.toString().length) {
          fillState[key] = fillStateifEmpty[key];
        } else {
          fillState[key] = value;
        }
      });

      return fillState as S;
    }
    return initState;
  });
  return [
    value,
    ({
      target,
    }: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >): any => {
      const type = target.type;
      const key = target.name;
      let value: string | number | boolean = target.value || "";
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
          return { ...preState, [out]: { ...preState[out], [inner]: value } };
        }
        return { ...preState, [key]: value };
      });
    },
    (value) => {
      if (value) setValue((prevState) => ({ ...prevState, ...value }));
    },
    (initWith = {}) => {
      setValue({ ...initState, ...initWith });
    },
    {
      Input: (props) => React.createElement("input", props) as any,
      TextArea: (props) => React.createElement("textarea", props) as any,
      CheckBox: (props) => React.createElement(React.Fragment, {
        children: [
          React.createElement("input", {
            ...props,
            id: props.name,
            type: "checkbox",
            checked: props.value,
          }),
          React.createElement("label", {
            htmlFor: props.name,
            children: props.label,
          }),
        ],
      }) as any,
      Submit: (props) => React.createElement("button", { ...props, type: "submit" }) as any,
    },
  ];
}