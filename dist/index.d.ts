import React, { ChangeEvent } from "react";
export declare function useFormrop<S>(initState: S, 
/** if there is any empty value in init state and you want to fill it use this */
fillStateifEmpty?: S): [S, (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, (key: Partial<S>) => void, (initWith?: Partial<S>) => void, {
    Input: (props: {
        type: "url" | "text";
        name: keyof S;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        disabled?: boolean | undefined;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    TextArea: (props: {
        name: keyof S;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        disabled?: boolean;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    CheckBox: (props: {
        label: string;
        name: keyof S;
        value: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        default?: boolean;
        className?: string;
        style?: React.CSSProperties;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    Selection: <D = object>(props: {
        name: keyof S;
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
        data: D;
        onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
        default?: keyof D;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
    }) => React.DetailedReactHTMLElement<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
    Submit: (props: {
        disabled?: boolean;
        children?: string;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}];
//# sourceMappingURL=index.d.ts.map