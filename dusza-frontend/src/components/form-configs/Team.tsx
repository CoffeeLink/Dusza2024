import { Config, GetConfig } from "../FormFactory.tsx";
import { Button } from "react-daisyui";

type LoginFields = {
  username: string;
  password: string;
};

export const GetLoginConfig: GetConfig<LoginFields> = (onChange, fields) => {
  const config: Config[] = [
    {
      key: "username",
      label: "Felhasználónév",
      errorFlag: false,
      errorMsg: "",
      value: fields.username,
      type: "text",
      onChange: (e) => onChange("username", e.target.value),
    },
    {
      key: "password",
      label: "Jelszó",
      errorFlag: false,
      errorMsg: "",
      value: fields.password,
      type: "password",
      onChange: (e) => onChange("password", e.target.value),
    },
  ];

  return config;
};

type EditFields = {
  name1: string;
  class1: string;
  name2: string;
  class2: string;
  name3: string;
  class3: string;
  extraName: string;
  extraClass: string;
  teachers: string[];
  language: string;
};

export const GetEditConfig: GetConfig<EditFields> = (onChange, fields) => {
  const classOptions = ["9", "10", "11", "12", "13"];
  const config: Config[] = [
    [
      {
        key: "name1",
        label: "Name 1",
        errorFlag: false,
        errorMsg: "",
        value: fields.name1,
        type: "text",
        onChange: (e) => onChange("name1", e.target.value),
      },
      {
        key: "class1",
        label: "Class 1",
        errorFlag: false,
        errorMsg: "",
        value: fields.class1,
        type: "dropdown",
        options: classOptions,
        onChange: (e) => onChange("class1", e.target.value),
      },
    ],
    [
      {
        key: "name2",
        label: "Name 2",
        errorFlag: false,
        errorMsg: "",
        value: fields.name2,
        type: "text",
        onChange: (e) => onChange("name2", e.target.value),
      },
      {
        key: "class2",
        label: "Class 2",
        errorFlag: false,
        errorMsg: "",
        value: fields.class2,
        type: "dropdown",
        options: classOptions,
        onChange: (e) => onChange("class2", e.target.value),
      },
    ],
    [
      {
        key: "name3",
        label: "Name 3",
        errorFlag: false,
        errorMsg: "",
        value: fields.name3,
        type: "text",
        onChange: (e) => onChange("name3", e.target.value),
      },
      {
        key: "class3",
        label: "Class 3",
        errorFlag: false,
        errorMsg: "",
        value: fields.class3,
        type: "dropdown",
        options: classOptions,
        onChange: (e) => onChange("class3", e.target.value),
      },
    ],
    [
      {
        key: "extraName",
        label: "Extra name",
        errorFlag: false,
        errorMsg: "",
        value: fields.extraName,
        type: "text",
        onChange: (e) => onChange("extraName", e.target.value),
      },
      {
        key: "extraClass",
        label: "Extra class",
        errorFlag: false,
        errorMsg: "",
        value: fields.extraClass,
        type: "dropdown",
        options: classOptions,
        onChange: (e) => onChange("extraClass", e.target.value),
      },
    ],
    {
      key: "teachers",
      label: "Teachers",
      errorFlag: false,
      errorMsg: "",
      type: "multi-input",
      values: fields.teachers,
      getAddButton: () => (
        <Button
          onClick={() => {
            onChange("teachers", [...fields.teachers, ""]);
          }}
          color={"primary"}
        >
          Add teacher
        </Button>
      ),
      getRemoveButton: (index) => (
        <Button
          onClick={() => {
            const newTeachers = fields.teachers.slice();
            newTeachers.splice(index, 1);
            onChange("teachers", newTeachers);
          }}
          color={"error"}
        >
          Remove
        </Button>
      ),
      configs: fields.teachers.map((teacher, index) => ({
        key: `teacher-${index}`,
        label: `Teacher ${index + 1}`,
        errorFlag: false,
        errorMsg: "",
        value: teacher,
        type: "text",
        onChange: (e) => {
          const newTeachers = fields.teachers.slice();
          newTeachers[index] = e.target.value;
          onChange("teachers", newTeachers);
        },
      })),
    },
    {
      key: "language",
      label: "Programming language",
      errorFlag: false,
      errorMsg: "",
      value: fields.language,
      type: "dropdown",
      onChange: (e) => onChange("language", e.target.value),
      options: ["C++", "Java", "Python"],
    },
  ];

  return config;
};

type RegistrationFields = LoginFields &
  EditFields & {
    schoolName: string;
    teamName: string;
  };

export const GetRegistrationConfig: GetConfig<RegistrationFields> = (
  onChange,
  fields,
) => {
  // extend LoginConfig
  let config = GetLoginConfig(onChange, {
    username: fields.username,
    password: fields.password,
  });
  config = config.concat(GetEditConfig(onChange, fields));
  config = config.concat([
    {
      key: "schoolName",
      label: "School name",
      errorFlag: false,
      errorMsg: "",
      value: fields.schoolName,
      type: "text",
      onChange: (e) => onChange("schoolName", e.target.value),
    },
    {
      key: "teamName",
      label: "Team name",
      errorFlag: false,
      errorMsg: "",
      value: fields.teamName,
      type: "text",
      onChange: (e) => onChange("teamName", e.target.value),
    },
  ]);

  return config;
};
