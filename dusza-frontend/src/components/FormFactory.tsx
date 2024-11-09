import React from "react";
import { Button, Form, Input, Select } from "react-daisyui";

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
  getAddButton: () => React.ReactNode;
  getRemoveButton: (index: number) => React.ReactNode;
  values: T["value"][];
};

export type Config = (SingleConfig | MultiConfig) | Config[];

export type GetConfig<FIELDS> = (
  onChange: (fieldName: keyof FIELDS, value: FIELDS[keyof FIELDS]) => void,
  fieldValues: { [key in keyof FIELDS]: FIELDS[key] },
) => Config[];

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col w-full">{children}</div>;
};

const FormFactoryRecursive = ({ configs }: { configs: Config[] }) => {
  const getElement = (config: SingleConfig) => {
    const { key, label, errorFlag, errorMsg, value, type, onChange } = config;

    switch (type) {
      case "text":
      case "email":
      case "number":
      case "password":
      case "date":
        return (
          <Wrapper key={key}>
            <label className="label">
              <span className="label-text">{label}</span>
            </label>
            <Input
              onChange={onChange}
              value={value}
              type={type}
              className="bg-base-200"
            />
            {errorFlag && <span>{errorMsg}</span>}
          </Wrapper>
        );

      case "dropdown":
        return (
          <Wrapper key={key}>
            <label className="label">
              <span className="label-text">{label}</span>
            </label>
            <Select onChange={onChange} value={value} className="bg-base-200">
              {config.options.map((option) => {
                return (
                  <Select.Option value={option} key={option}>
                    {option}
                  </Select.Option>
                );
              })}
            </Select>
            {errorFlag && <span>{errorMsg}</span>}
          </Wrapper>
        );

      case "radio":
        return (
          <Wrapper key={key}>
            <label className="label">
              <span className="label-text">{label}</span>
            </label>
            {config.options.map((option) => {
              return (
                <div key={option}>
                  <Input
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
          </Wrapper>
        );
    }
  };

  const getMultiElement = (config: MultiConfig) => {
    const { key, label, configs, getAddButton, getRemoveButton } = config;

    return (
      <div key={key} className={"flex flex-col pt-2"}>
        <p>{label}</p>
        <div className={"flex flex-col gap-2"}>
          {configs.map((subConfig, index) => {
            return (
              <div key={index} className={"flex flex-row gap-2 items-end"}>
                {getElement(subConfig)}
                {getRemoveButton(index)}
              </div>
            );
          })}
          {getAddButton()}
        </div>
      </div>
    );
  };

  return (
    <>
      {configs.map((config, indexA) => {
        if (Array.isArray(config)) {
          // recursively call FormFactory
          return (
            <div key={indexA} className="flex flex-row gap-2">
              {config.map((subConfig, indexB) => (
                <FormFactoryRecursive
                  key={`${indexA}-${indexB}`}
                  configs={[subConfig]}
                />
              ))}
            </div>
          );
        }

        if (config.type === "multi-input") {
          return getMultiElement(config);
        } else {
          return getElement(config);
        }
      })}
    </>
  );
};

type Submit = {
  text: string;
  onSubmit: () => void;
};

export const FormFactory = ({
  configs,
  submit,
}: {
  configs: Config[];
  submit?: Submit;
}) => {
  return (
    <Form className="form-control gap-2">
      <FormFactoryRecursive configs={configs} />
      {submit && (
        <Button color="primary" className="w-full" onClick={submit.onSubmit}>
          {submit.text}
        </Button>
      )}
    </Form>
  );
};
