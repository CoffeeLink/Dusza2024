import React from "react";
type ConfigBase = {
    key: string;
    label: string;
    errorFlag: boolean;
    errorMsg: string;
};
export type ConfigInput = ConfigBase & {
    type: "text" | "email" | "number" | "password" | "date";
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
};
export type ConfigSelect = ConfigBase & {
    options: string[];
};
export type ConfigDropdown = ConfigSelect & {
    type: "dropdown";
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
};
export type ConfigRadio = ConfigSelect & {
    type: "radio";
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string[];
};
export type SingleConfig = (ConfigInput | ConfigDropdown | ConfigRadio) & {
    required?: boolean;
};
export type MultiConfig<T extends SingleConfig = SingleConfig> = ConfigBase & {
    type: "multi-input";
    configs: T[];
    getAddButton: () => React.ReactNode;
    getRemoveButton: (index: number) => React.ReactNode;
    values: T["value"][];
};
export type Config = (SingleConfig | MultiConfig) | Config[];
export type GetConfig<FIELDS, DATA = null> = (onChange: (fieldName: keyof FIELDS, value: FIELDS[keyof FIELDS]) => void, fieldValues: {
    [key in keyof FIELDS]: FIELDS[key];
}, data: DATA) => Config[];
type Submit = {
    text: string | React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export declare const FormFactory: ({ configs, submit, }: {
    configs: Config[];
    submit?: Submit;
}) => import("react/jsx-runtime").JSX.Element;
export {};
