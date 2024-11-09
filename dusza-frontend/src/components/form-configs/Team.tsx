import { Config, GetConfig } from "../FormFactory.tsx";
import { Button } from "react-daisyui";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/16/solid";

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
  const classOptions = ["?", "9", "10", "11", "12", "13"];
  const config: Config[] = [
    [
      {
        key: "name1",
        label: "1. csapattag",
        errorFlag: false,
        errorMsg: "",
        value: fields.name1,
        type: "text",
        onChange: (e) => onChange("name1", e.target.value),
      },
      {
        key: "class1",
        label: "Évfolyam",
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
        label: "2. csapattag",
        errorFlag: false,
        errorMsg: "",
        value: fields.name2,
        type: "text",
        onChange: (e) => onChange("name2", e.target.value),
      },
      {
        key: "class2",
        label: "Évfolyam",
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
        label: "3. csapattag",
        errorFlag: false,
        errorMsg: "",
        value: fields.name3,
        type: "text",
        onChange: (e) => onChange("name3", e.target.value),
      },
      {
        key: "class3",
        label: "Évfolyam",
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
        label: "Pót csapattag",
        errorFlag: false,
        errorMsg: "",
        value: fields.extraName,
        type: "text",
        onChange: (e) => onChange("extraName", e.target.value),
      },
      {
        key: "extraClass",
        label: "Évfolyam",
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
      label: "Felkészítő tanárok",
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
          Felkészítőtanár hozzáadása <UserPlusIcon className="w-5"/>
        </Button>
      ),
      getRemoveButton: (index) => (
        <Button
          onClick={() => {
            const newTeachers = fields.teachers.slice();
            newTeachers.splice(index, 1);
            onChange("teachers", newTeachers);
          }}
          className="btn"
          color={"error"}
        >
          <UserMinusIcon className="w-5 text-slate-50"/>
        </Button>
      ),
      configs: fields.teachers.map((teacher, index) => ({
        key: `teacher-${index}`,
        label: `${index + 1}. felkészítő tanár`,
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
      label: "Programozási nyelv",
      errorFlag: false,
      errorMsg: "",
      value: fields.language,
      type: "dropdown",
      onChange: (e) => onChange("language", e.target.value),
      options: ["Válassz nyelvet", "C++", "Java", "Python"],
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
      label: "Iskola neve",
      errorFlag: false,
      errorMsg: "",
      value: fields.schoolName,
      type: "text",
      onChange: (e) => onChange("schoolName", e.target.value),
    },
    {
      key: "teamName",
      label: "Csapatnév",
      errorFlag: false,
      errorMsg: "",
      value: fields.teamName,
      type: "text",
      onChange: (e) => onChange("teamName", e.target.value),
    },
  ]);

  return config;
};
