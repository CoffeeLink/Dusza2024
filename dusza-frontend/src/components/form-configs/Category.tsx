import { Config, GetConfig } from "../FormFactory.tsx";

type CategoryFields = {
  name: string;
  description: string;
  deadline: string;
};

export const GetAddCategoryConfig: GetConfig<CategoryFields, null> = (
  onChange,
  fields,
) => {
  const config: Config[] = [
    [
      {
        key: "name",
        label: "Name",
        errorFlag: false,
        errorMsg: "",
        value: fields.name,
        type: "text",
        onChange: (e) => onChange("name", e.target.value),
      },
      {
        key: "description",
        label: "Description",
        errorFlag: false,
        errorMsg: "",
        value: fields.description,
        type: "text",
        onChange: (e) => onChange("description", e.target.value),
      },
    ],
    {
      key: "deadline",
      label: "Deadline",
      errorFlag: false,
      errorMsg: "",
      value: fields.deadline,
      type: "date",
      onChange: (e) => onChange("deadline", e.target.value),
    },
  ];

  return config;
};

export const GetEditCategoryConfig: GetConfig<CategoryFields, null> = (
  onChange,
  fields,
) => {
  return GetAddCategoryConfig(onChange, fields, null);
};
