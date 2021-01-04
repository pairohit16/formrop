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
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    TextArea: (props: {
        name: keyof S;
        value: string;
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
        disabled?: boolean;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    CheckBox: (props: {
        label: string;
        name: keyof S;
        value: boolean;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    Submit: (props: {
        disabled?: boolean;
        children?: string;
    }) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}];
//# sourceMappingURL=index.d.ts.map