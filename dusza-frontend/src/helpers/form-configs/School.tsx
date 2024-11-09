import { Config, GetConfig } from "../../components/FormFactory.tsx";

type SchoolFields = {
  name: string;
  location: string;
  username: string;
  password: string;
  contactName: string;
  contactEmail: string;
};

export const GetAddSchoolConfig: GetConfig<SchoolFields> = (
  onChange,
  fields,
) => {
  const config: Config[] = [
    [
      {
        key: "name",
        label: "Iskola neve",
        errorFlag: false,
        errorMsg: "",
        value: fields.name,
        type: "text",
        required: true,
        onChange: (e) => onChange("name", e.target.value),
      },
      {
        key: "location",
        label: "Iskola címe",
        errorFlag: false,
        errorMsg: "",
        value: fields.location,
        type: "text",
        required: true,
        onChange: (e) => onChange("location", e.target.value),
      },
    ],
    [
      {
        key: "username",
        label: "Iskola felhasználóneve",
        errorFlag: false,
        errorMsg: "",
        value: fields.username,
        type: "text",
        required: true,
        onChange: (e) => onChange("username", e.target.value),
      },
      {
        key: "password",
        label: "Iskola jelszava",
        errorFlag: false,
        errorMsg: "",
        value: fields.password,
        type: "password",
        required: true,
        onChange: (e) => onChange("password", e.target.value),
      },
    ],
    [
      {
        key: "contactName",
        label: "Kapcsolattartó neve",
        errorFlag: false,
        errorMsg: "",
        value: fields.contactName,
        type: "text",
        onChange: (e) => onChange("contactName", e.target.value),
      },
      {
        key: "contactEmail",
        label: "Kapcsolattartó e-mail címe",
        errorFlag: false,
        errorMsg: "",
        value: fields.contactEmail,
        type: "email",
        onChange: (e) => onChange("contactEmail", e.target.value),
      },
    ],
  ];

  return config;
};

export const GetEditSchoolConfig: GetConfig<SchoolFields> = (
  onChange,
  fields,
) => {
  // Not much different
  return GetAddSchoolConfig(onChange, fields, null);
};
