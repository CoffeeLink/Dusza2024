import { Config, GetConfig } from "../../components/FormFactory.tsx";

type ApplicationFields = {
  category: string;
  school: string;
  language: string;
};

export const GetAddApplicationConfig: GetConfig<
  ApplicationFields,
  { categories: string[]; schools: string[]; languages: string[] }
> = (onChange, fields, { categories, schools, languages }) => {
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
    {
      key: "school",
      label: "Iskola",
      errorFlag: false,
      errorMsg: "",
      value: fields.school,
      type: "dropdown",
      options: schools,
      onChange: (e) => onChange("school", e.target.value),
    },
    {
      key: "language",
      label: "Nyelv",
      errorFlag: false,
      errorMsg: "",
      value: fields.language,
      type: "dropdown",
      options: languages,
      onChange: (e) => onChange("language", e.target.value),
    },
  ];

  return config;
};

export const GetEditApplicationConfig: GetConfig<
  ApplicationFields,
  { categories: string[]; schools: string[]; languages: string[] }
> = (onChange, fields, extra) => {
  return GetAddApplicationConfig(onChange, fields, extra);
};
