import { Config, GetConfig } from "../../components/FormFactory.tsx";
import { Language } from "../models.ts";

export const GetAddLanguageConfig: GetConfig<Language> = (onChange, fields) => {
  const config: Config[] = [
    {
      key: "name",
      label: "Név",
      errorFlag: false,
      errorMsg: "",
      value: fields.lang_name,
      type: "text",
      required: true,
      onChange: (e) => onChange("lang_name", e.target.value),
    },
  ];

  return config;
};

export const GetEditLanguageConfig: GetConfig<Language> = (
  onChange,
  fields,
) => {
  return GetAddLanguageConfig(onChange, fields, null);
};
