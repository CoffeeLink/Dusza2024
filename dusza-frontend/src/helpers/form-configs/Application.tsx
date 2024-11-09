import { Config, GetConfig } from "../../components/FormFactory.tsx";

type ApplicationFields = {
  category: string;
};

export const GetAddApplicationConfig: GetConfig<
  ApplicationFields,
  { categories: string[] }
> = (onChange, fields, { categories }) => {
  const config: Config[] = [
    {
      key: "category",
      label: "Kategória",
      errorFlag: false,
      errorMsg: "",
      value: fields.category,
      type: "dropdown",
      options: categories,
      onChange: (e) => onChange("category", e.target.value),
    },
  ];

  return config;
};

export const GetEditApplicationConfig: GetConfig<
  ApplicationFields,
  { categories: string[] }
> = (onChange, fields, extra) => {
  return GetAddApplicationConfig(onChange, fields, extra);
};
