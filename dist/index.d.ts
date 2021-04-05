import React, { ChangeEvent } from "react";
declare type Modifier<V> = (value: V) => V;
declare type FromDate<V> = (value: Date) => V;
declare type FromDateTime<V> = (value: number) => V;
declare type ToDate<V> = (value: V) => string;
export declare function useFormrop<S>(initState: S | (() => S)): [S, (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, (key: Partial<S>) => void, (initWith?: Partial<S> | (() => Partial<S>)) => void, {
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
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    Date: <N extends keyof S, V>(props: {
        name: N;
        deep?: keyof S[N];
        value: V;
        toDate: ToDate<V>;
        fromDate: FromDate<V>;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        disabled?: boolean | undefined;
        readOnly?: boolean | undefined;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        autoFocus?: boolean;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    DateTime: <N extends keyof S, V>(props: {
        name: N;
        deep?: keyof S[N];
        value: V;
        toDate: ToDate<V>;
        fromDate: FromDateTime<V>;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        disabled?: boolean | undefined;
        readOnly?: boolean | undefined;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        autoFocus?: boolean;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
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
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    CheckBox: <N extends keyof S>(props: {
        label: string;
        name: N;
        deep?: keyof S[N];
        value: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        className?: string;
        style?: React.CSSProperties;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
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
    }) => React.DetailedReactHTMLElement<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
    Submit: (props: {
        disabled?: boolean;
        children?: string;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}];
export declare function useFormropArrays<S>(initState: S[]): [S[], (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, (value: S[]) => void, (initWith?: S[]) => void, {
    Input: <V>(props: {
        type: "url" | "text" | "number";
        value: V;
        modifier?: Modifier<V>;
        name: string;
        deep?: string;
        index: number;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        disabled?: boolean | undefined;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        autoFocus?: boolean;
        placeholder?: string;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    Date: <V>(props: {
        name: string;
        deep?: string;
        value: V;
        index: number;
        toDate: ToDate<V>;
        fromDate: FromDate<V>;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        disabled?: boolean | undefined;
        readOnly?: boolean | undefined;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        autoFocus?: boolean;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    DateTime: <V>(props: {
        name: string;
        deep?: string;
        value: V;
        index: number;
        toDate: ToDate<V>;
        fromDate: FromDate<V>;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        disabled?: boolean | undefined;
        readOnly?: boolean | undefined;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        autoFocus?: boolean;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
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
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    CheckBox: (props: {
        label: string;
        index: number;
        name: string;
        deep?: string;
        value: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        className?: string;
        style?: React.CSSProperties;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
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
    }) => React.DetailedReactHTMLElement<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
    Submit: (props: {
        disabled?: boolean;
        children?: string;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}];
export {};
//# sourceMappingURL=index.d.ts.map