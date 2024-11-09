import { Config, GetConfig } from "../../components/FormFactory.tsx";

type LanguageFields = {
  name: string;
};

export const GetAddLanguageConfig: GetConfig<LanguageFields> = (
  onChange,
  fields,
) => {
  const config: Config[] = [
    {
      key: "name",
      label: "Név",
      errorFlag: false,
      errorMsg: "",
      value: fields.name,
      type: "text",
      required: true,
      onChange: (e) => onChange("name", e.target.value),
    },
  ];

  return config;
};

export const GetEditLanguageConfig: GetConfig<LanguageFields> = (
  onChange,
  fields,
) => {
  return GetAddLanguageConfig(onChange, fields, null);
};
