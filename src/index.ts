import React, { useState, ChangeEvent, useMemo } from "react";

const modifierStore = {};
type Modifier<V> = (value: V) => V;
export function useFormrop<S>(
  initState: S | (() => S)
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
      Input: <N extends keyof S, V>(props: {
        type: "url" | "text" | "number";
        name: N;
        deep?: keyof S[N];
        value: V;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        modifier?: Modifier<V>;
        disabled?: boolean | undefined;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        autoFocus?: boolean;
        placeholder?: string;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      TextArea: <N extends keyof S>(props: {
        name: N;
        deep?: keyof S[N];
        value: string;
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        disabled?: boolean;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        autoFocus?: boolean;
        placeholder?: string;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >;
      CheckBox: <N extends keyof S>(props: {
        label: string;
        name: N;
        deep?: keyof S[N];
        value: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        className?: string;
        style?: React.CSSProperties;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      Selection: <N extends keyof S>(props: {
        name: N;
        deep?: keyof S[N];
        value: string | number;
        /** {
         *    value1: label1,
         *    value2: label2,
         *    WW: 'World Wide',
         *    IN: 'India',
         *    0: 'Don't include',
         *    1: 'Yes, i am in',
         *    ....
         * } */
        data: Object;
        onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
      }) => React.DetailedReactHTMLElement<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >;
      Submit: (props: {
        disabled?: boolean;
        children?: string;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
    }
  ] {
  /** Html Inputs design */
  const [value, setValue] = useState(initState);
  return [
    value,
    ({
      target,
    }: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >): any => {
      const type = target.type;
      const name = target.name;
      const deep = target.dataset.deep;
      const isModifier = target.dataset.modifier === "true";
      const key = name + "" + deep;
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
      // check for modifier
      if (isModifier) {
        const modifier = modifierStore[key] as Modifier<typeof value>;
        value = modifier(value);
      }

      setValue((preState) => {
        if (deep)
          return { ...preState, [name]: { ...preState[name], [deep]: value } };

        return { ...preState, [name]: value };
      });
    },
    (value) => {
      if (value) setValue((prevState) => ({ ...prevState, ...value }));
    },
    (initWith = {}) => {
      if (typeof initState === "function") {
        // @ts-ignore
        setValue({ ...initState(), ...initWith });
      } else {
        setValue({ ...initState, ...initWith });
      }
    },
    // components
    useMemo(
      () => ({
        Input: ({ deep, modifier, ...props }) => {
          if (modifier) {
            const key = props.name + "" + deep;
            modifierStore[key] = modifier;
          }

          return React.createElement("input", {
            ...props,
            // this is hack just to pass function or anything in native input!!
            ["data-modifier"]: !!modifier,
            ["data-deep"]: deep,
          }) as any
        },
        TextArea: ({ deep, ...props }) =>
          React.createElement("textarea", {
            ...props,
            ["data-deep"]: deep,
          }) as any,
        CheckBox: ({ deep, value, label, ...props }) =>
          React.createElement(React.Fragment, {
            children: [
              React.createElement("input", {
                ...props,
                ["data-deep"]: deep,
                id: props.name + "" + deep,
                type: "checkbox",
                checked: value,
                key: props.name + "" + deep + "input"
              }),
              React.createElement("label", {
                htmlFor: props.name + "" + deep,
                children: label,
                key: props.name + "" + deep + "label"
              }),
            ],
          }) as any,
        Selection: ({ deep, data, ...props }) => {
          return React.createElement(
            "select",
            {
              ...props,
              ["data-deep"]: deep,
            },
            Object.entries(data).map(([value, label]) => {
              return React.createElement(
                "option",
                {
                  key: value,
                  value: value,
                },
                label as string
              );
            })
          ) as any;
        },
        Submit: (props) =>
          React.createElement("button", { ...props, type: "submit" }),
      }),
      []
    ),
  ];
}

export function useFormropArrays<S>(
  initState: S[]
): [
    S[],
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void,
    (value: S[]) => void,
    (initWith?: S[]) => void,
    {
      Input: (props: {
        type: "url" | "text";
        name: string;
        deep?: string;
        index: number;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        modifier?: "toLowerCase" | "toUpperCase";
        disabled?: boolean | undefined;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        autoFocus?: boolean;
        placeholder?: string;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      TextArea: (props: {
        name: string;
        deep?: string;
        index: number;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        disabled?: boolean;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        autoFocus?: boolean;
        placeholder?: string;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >;
      CheckBox: (props: {
        label: string;
        index: number;
        name: string;
        deep?: string;
        value: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        className?: string;
        style?: React.CSSProperties;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
      Selection: (props: {
        index: number;
        name: string;
        deep?: string;
        value: string | number;
        /** {
         *    value1: label1,
         *    value2: label2,
         *    WW: 'World Wide',
         *    IN: 'India',
         *    0: 'Don't include',
         *    1: 'Yes, i am in',
         *    ....
         * } */
        data: Object;
        onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
      }) => React.DetailedReactHTMLElement<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >;
      Submit: (props: {
        disabled?: boolean;
        children?: string;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
      }) => React.DetailedReactHTMLElement<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
    }
  ] {
  /** Html Inputs design */
  const [value, setValue] = useState<S[]>(() => initState);
  return [
    value,
    ({
      target,
    }: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >): any => {
      const type = target.type;
      const name = target.name;
      const deep = target.dataset.deep;
      const index = Number(target.dataset.index);

      let value: string | number | boolean = target.value || "";
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
      if (modifier && typeof value === "string") value = value[modifier]();

      setValue((preState) => {
        const copy = Array.from(preState);
        if (deep) {
          copy[index][name][deep] = value;
        } else copy[index][name] = value;

        return copy;
      });
    },
    (value) => {
      if (Array.isArray(value)) setValue(value);
    },
    () => {
      setValue(initState);
    },
    // components
    useMemo(
      () => ({
        Input: ({ index, deep, modifier, ...props }) =>
          React.createElement("input", {
            ...props,
            ["data-index"]: index,
            ["data-deep"]: deep,
          }) as any,
        TextArea: ({ index, deep, ...props }) =>
          React.createElement("textarea", {
            ...props,
            ["data-index"]: index,
            ["data-deep"]: deep,
          }) as any,
        CheckBox: ({ index, deep, value, label, ...props }) =>
          React.createElement(React.Fragment, {
            children: [
              React.createElement("input", {
                ...props,
                ["data-index"]: index,
                ["data-deep"]: deep,
                id: props.name,
                type: "checkbox",
                checked: value,
              }),
              React.createElement("label", {
                htmlFor: props.name,
                children: label,
              }),
            ],
          }) as any,
        Selection: ({ index, deep, data, ...props }) => {
          return React.createElement(
            "select",
            {
              ...props,
              ["data-index"]: index,
              ["data-deep"]: deep,
            },
            Object.entries(data).map(([value, label]) => {
              return React.createElement(
                "option",
                {
                  key: value,
                  value: value,
                },
                label as string
              );
            })
          ) as any;
        },
        Submit: (props) =>
          React.createElement("button", { ...props, type: "submit" }),
      }),
      []
    ),
  ];
}
