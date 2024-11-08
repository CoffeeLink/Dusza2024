import { Config, FormElementTypes, GetConfig } from "./FormFactory.tsx";

export const GetLoginConfig: GetConfig<["username", "password"]> = (
  onChange,
  fieldsValues,
) => {
  const config: Config[] = [
    {
      key: "username",
      label: "Username",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.username,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("username", e.target.value),
    },
    {
      key: "password",
      label: "Password",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.password,
      type: FormElementTypes.PASSWORD,
      onChange: (e) => onChange("password", e.target.value),
    },
  ];

  return config;
};

export const GetEditConfig: GetConfig<
  [
    "name1",
    "class1",
    "name2",
    "class2",
    "name3",
    "class3",
    "extraName",
    "extraClass",
    "teacher",
    "language",
  ]
> = (onChange, fieldsValues) => {
  const config: Config[] = [
    {
      key: "name1",
      label: "Name 1",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.name1,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("name1", e.target.value),
    },
    {
      key: "class1",
      label: "Class 1",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.class1,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("class1", e.target.value),
    },
    {
      key: "name2",
      label: "Name 2",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.name2,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("name2", e.target.value),
    },
    {
      key: "class2",
      label: "Class 2",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.class2,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("class2", e.target.value),
    },
    {
      key: "name3",
      label: "Name 3",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.name3,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("name3", e.target.value),
    },
    {
      key: "class3",
      label: "Class 3",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.class3,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("class3", e.target.value),
    },
    {
      key: "extraName",
      label: "Extra name",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.extraName,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("extraName", e.target.value),
    },
    {
      key: "extraClass",
      label: "Extra class",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.extraClass,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("extraClass", e.target.value),
    },
    {
      key: "teacher",
      label: "Teacher",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.teacher,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("teacher", e.target.value),
    },
    {
      key: "language",
      label: "Programming language",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.language,
      type: FormElementTypes.DROPDOWN,
      onChange: (e) => onChange("language", e.target.value),
      options: ["C++", "Java", "Python"],
    },
  ];

  return config;
};

export const GetRegistrationConfig: GetConfig<
  [
    "username",
    "password",
    "schoolName",
    "teamName",
    "name1",
    "class1",
    "name2",
    "class2",
    "name3",
    "class3",
    "extraName",
    "extraClass",
    "teacher",
    "language",
  ]
> = (onChange, fieldsValues) => {
  // extend LoginConfig
  let config = GetLoginConfig(onChange, {
    username: fieldsValues.username,
    password: fieldsValues.password,
  });
  config = config.concat(GetEditConfig(onChange, fieldsValues));
  config = config.concat([
    {
      key: "schoolName",
      label: "School name",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.schoolName,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("schoolName", e.target.value),
    },
    {
      key: "teamName",
      label: "Team name",
      errorFlag: false,
      errorMsg: "",
      value: fieldsValues.teamName,
      type: FormElementTypes.TEXT,
      onChange: (e) => onChange("teamName", e.target.value),
    },
  ]);

  return config;
};
