import React from "react";

export enum FormElementTypes {
  TEXT = "text",
  EMAIL = "email",
  NUMBER = "number",
  PASSWORD = "password",
  DATE = "date",
  DROPDOWN = "dropdown",
}

type ConfigBase = {
  key: string;
  label: string;
  errorFlag: boolean;
  errorMsg: string;
  value: string;
};

export type ConfigInput = ConfigBase & {
  type:
    | FormElementTypes.TEXT
    | FormElementTypes.EMAIL
    | FormElementTypes.NUMBER
    | FormElementTypes.PASSWORD
    | FormElementTypes.DATE;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ConfigSelect = ConfigBase & {
  type: FormElementTypes.DROPDOWN;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};

export type Config = ConfigInput | ConfigSelect;

export type GetConfig<keys extends string[] = string[]> = (
  onChange: (fieldName: keys[number], value: string) => void,
  fieldValues: { [key in keys[number]]: string },
) => Config[];

export const FormFactory = ({ configs }: { configs: Config[] }) => {
  const getElement = (config: Config) => {
    const { key, label, errorFlag, errorMsg, value, type, onChange } = config;

    switch (type) {
      case FormElementTypes.TEXT:
        return (
          <div key={key}>
            <label>{label}</label>
            <input type="text" onChange={onChange} value={value} />
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );

      case FormElementTypes.EMAIL:
        return (
          <div key={key}>
            <label>{label}</label>
            <input type="email" onChange={onChange} value={value} />
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );

      case FormElementTypes.NUMBER:
        return (
          <div key={key}>
            <label>{label}</label>
            <input type="number" onChange={onChange} value={value} />
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );

      case FormElementTypes.PASSWORD:
        return (
          <div key={key}>
            <label>{label}</label>
            <input type="password" onChange={onChange} value={value} />
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );

      case FormElementTypes.DATE:
        return (
          <div key={key}>
            <label>{label}</label>
            <input type="date" onChange={onChange} value={value} />
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );

      case FormElementTypes.DROPDOWN:
        return (
          <div key={key}>
            <label>{label}</label>
            <select onChange={onChange} value={value}>
              {config.options.map((option) => {
                return (
                  <option value={option} key={option}>
                    {option}
                  </option>
                );
              })}
            </select>
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );
    }
  };
  return (
    <div>
      {configs.map((config) => {
        // add key to each element
        return getElement(config);
      })}
    </div>
  );
};
