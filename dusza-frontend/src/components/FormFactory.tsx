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

export type GetConfig<FIELDS, DATA = null> = (
  onChange: (fieldName: keyof FIELDS, value: FIELDS[keyof FIELDS]) => void,
  fieldValues: { [key in keyof FIELDS]: FIELDS[key] },
  data: DATA,
) => Config[];

const Wrapper = ({
  children,
  label,
  errorFlag,
  errorMsg,
  required,
}: {
  children: React.ReactNode;
  label: string;
  errorFlag: boolean;
  errorMsg: string;
  required?: boolean;
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="label">
        <span className="label-text text-l">
          {label} {required && <span className="text-error">*</span>}
        </span>
      </label>
      {children}
      {errorFlag && <span className="text-error">{errorMsg}</span>}
    </div>
  );
};

const FormFactoryRecursive = ({ configs }: { configs: Config[] }) => {
  const getElement = (config: SingleConfig) => {
    const { key, label, errorFlag, errorMsg, value, type, onChange, required } =
      config;

    switch (type) {
      case "text":
      case "email":
      case "number":
      case "password":
      case "date":
        return (
          <Wrapper
            key={key}
            label={label}
            errorFlag={errorFlag}
            errorMsg={errorMsg}
            required={required}
          >
            <Input
              onChange={onChange}
              value={value}
              type={type}
              className={`bg-base-100 text-lg p-2 border-2 border-gray-300 rounded-md ${errorFlag ? "border-error" : ""}`}
              required={required}
            />
          </Wrapper>
        );

      case "dropdown":
        return (
          <Wrapper
            key={key}
            label={label}
            errorFlag={errorFlag}
            errorMsg={errorMsg}
          >
            <Select
              onChange={onChange}
              value={value}
              className={`bg-slate-50 ${errorFlag ? "border-error" : ""}`}
              required={required}
            >
              {config.options.map((option) => {
                return (
                  <Select.Option value={option} key={option}>
                    {option}
                  </Select.Option>
                );
              })}
            </Select>
          </Wrapper>
        );

      case "radio":
        return (
          <Wrapper
            key={key}
            label={label}
            errorFlag={errorFlag}
            errorMsg={errorMsg}
          >
            {config.options.map((option) => {
              return (
                <div key={option}>
                  <Input
                    type="radio"
                    value={option}
                    onChange={onChange}
                    checked={value.includes(option)}
                    required={required}
                  />
                  <label>{option}</label>
                </div>
              );
            })}
          </Wrapper>
        );
    }
  };

  const getMultiElement = (config: MultiConfig) => {
    const {
      key,
      label,
      configs,
      getAddButton,
      getRemoveButton,
      errorFlag,
      errorMsg,
    } = config;

    return (
      <div key={key} className={"flex flex-col pt-2"}>
        <p>
          {label} {errorFlag && <span className="text-error">{errorMsg}</span>}
        </p>
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
  text: string | React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const FormFactory = ({
  configs,
  submit,
}: {
  configs: Config[];
  submit?: Submit;
}) => {
  // ref to the form
  const formRef = React.useRef<HTMLFormElement>(null);

  // Recursively check if errorFlag is true somewhere in the configs
  // Crazy performance, trust me bro
  const hasError = (configs: Config[]): boolean => {
    for (const config of configs) {
      if (Array.isArray(config)) {
        if (hasError(config)) {
          return true;
        }
      } else {
        if (config.errorFlag) {
          return true;
        }
      }
    }

    return false;
  };

  // Get if all fields with required are filled in the form
  // NOT IN THE CONFIGS, IN THE ACTUAL FORM
  const isFilled = () => {
    if (!formRef.current) {
      return false;
    }

    const inputs =
      formRef.current.querySelectorAll<HTMLInputElement>("input, select");

    for (const input of inputs) {
      if (input.required && !input.value) {
        return false;
      }
    }

    return true;
  };

  return (
    <Form
      className="form-control gap-2"
      onSubmit={submit?.onSubmit}
      ref={formRef}
    >
      <FormFactoryRecursive configs={configs} />
      {submit && (
        <>
          {/*<br />*/}
          <Button
            color="primary"
            className="w-full btn mt-4"
            type="submit"
            disabled={!isFilled() || hasError(configs)}
          >
            {submit.text}
          </Button>
        </>
      )}
    </Form>
  );
};
