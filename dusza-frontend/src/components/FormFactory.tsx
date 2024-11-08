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

export type SingleConfig = ConfigInput | ConfigDropdown | ConfigRadio;
export type MultiConfig<T extends SingleConfig = SingleConfig> = ConfigBase & {
  type: "multi-input";
  configs: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  values: T["value"][];
};

export type Config = SingleConfig | MultiConfig;

export type GetConfig<FIELDS> = (
  onChange: (fieldName: keyof FIELDS, value: FIELDS[keyof FIELDS]) => void,
  fieldValues: { [key in keyof FIELDS]: FIELDS[key] },
) => Config[];

export const FormFactory = ({ configs }: { configs: Config[] }) => {
  const getElement = (config: SingleConfig) => {
    const { key, label, errorFlag, errorMsg, value, type, onChange } = config;

    switch (type) {
      case "text":
        return (
          <div key={key}>
            <label>{label}</label>
            <input type="text" onChange={onChange} value={value} />
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );

      case "email":
        return (
          <div key={key}>
            <label>{label}</label>
            <input type="email" onChange={onChange} value={value} />
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );

      case "number":
        return (
          <div key={key}>
            <label>{label}</label>
            <input type="number" onChange={onChange} value={value} />
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );

      case "password":
        return (
          <div key={key}>
            <label>{label}</label>
            <input type="password" onChange={onChange} value={value} />
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );

      case "date":
        return (
          <div key={key}>
            <label>{label}</label>
            <input type="date" onChange={onChange} value={value} />
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );

      case "dropdown":
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

      case "radio":
        return (
          <div key={key}>
            <label>{label}</label>
            {config.options.map((option) => {
              return (
                <div key={option}>
                  <input
                    type="radio"
                    value={option}
                    onChange={onChange}
                    checked={value.includes(option)}
                  />
                  <label>{option}</label>
                </div>
              );
            })}
            {errorFlag && <span>{errorMsg}</span>}
          </div>
        );
    }
  };

  const getMultiElement = (config: MultiConfig) => {
    const { key, label, configs, onAdd, onRemove } = config;

    return (
      <div key={key}>
        <label>{label}</label>
        {configs.map((subConfig, index) => {
          return (
            <div key={index}>
              {getElement(subConfig)}
              <button onClick={() => onRemove(index)}>Remove</button>
            </div>
          );
        })}
        <button onClick={onAdd}>Add</button>
      </div>
    );
  };

  return (
    <div>
      {configs.map((config) => {
        // add key to each element
        if (config.type === "multi-input") {
          return getMultiElement(config);
        } else {
          return getElement(config);
        }
      })}
    </div>
  );
};
