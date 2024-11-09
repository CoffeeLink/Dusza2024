import { Config, GetConfig } from "../FormFactory.tsx";

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
        label: "Name",
        errorFlag: false,
        errorMsg: "",
        value: fields.name,
        type: "text",
        onChange: (e) => onChange("name", e.target.value),
      },
      {
        key: "location",
        label: "Location",
        errorFlag: false,
        errorMsg: "",
        value: fields.location,
        type: "text",
        onChange: (e) => onChange("location", e.target.value),
      },
    ],
    [
      {
        key: "username",
        label: "Username",
        errorFlag: false,
        errorMsg: "",
        value: fields.username,
        type: "text",
        onChange: (e) => onChange("username", e.target.value),
      },
      {
        key: "password",
        label: "Password",
        errorFlag: false,
        errorMsg: "",
        value: fields.password,
        type: "password",
        onChange: (e) => onChange("password", e.target.value),
      },
    ],
    [
      {
        key: "contactName",
        label: "Contact Name",
        errorFlag: false,
        errorMsg: "",
        value: fields.contactName,
        type: "text",
        onChange: (e) => onChange("contactName", e.target.value),
      },
      {
        key: "contactEmail",
        label: "Contact Email",
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
  return GetAddSchoolConfig(onChange, fields);
};
