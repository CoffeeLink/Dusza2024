import {
  Config,
  GetConfig,
  SingleConfig,
} from "../../components/FormFactory.tsx";
import { Button } from "react-daisyui";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import {
  CategoryWithId,
  LanguageWithId,
  SchoolWithId,
  TeamEdit,
  TeamRegistration,
  UsernamePassword,
} from "../models.ts";

export const GetLoginConfig: GetConfig<UsernamePassword> = (
  onChange,
  fields,
) => {
  const config: Config[] = [
    {
      key: "username",
      label: "Felhasználónév",
      errorFlag: false,
      errorMsg: "",
      value: fields.username,
      type: "text",
      required: true,
      onChange: (e) => onChange("username", e.target.value),
    },
    {
      key: "password",
      label: "Jelszó",
      errorFlag: false,
      errorMsg: "A jelszó túl rövid!",
      value: fields.password,
      type: "password",
      required: true,
      onChange: (e) => onChange("password", e.target.value),
    },
  ];

  return config;
};

// type EditFields = {
//   name1: string;
//   class1: string;
//   name2: string;
//   class2: string;
//   name3: string;
//   class3: string;
//   extraName: string;
//   extraClass: string;
//   teachers: string[];
//   language: string;
//   category: string;
// };

export const GetEditConfig: GetConfig<
  TeamEdit,
  { languages: LanguageWithId[]; categories: CategoryWithId[] }
> = (onChange, fields, { languages, categories }) => {
  const classOptions = ["8", "9", "10", "11", "12", "13"];
  const isTeachersEnough = fields.sherpa_teachers.length >= 1;

  const config: Config[] = [
    [
      {
        key: "name1",
        label: "1. csapattag",
        errorFlag: false,
        errorMsg: "",
        value: fields.members[0].member_name,
        type: "text",
        required: true,
        onChange: (e) =>
          onChange("members", [
            { ...fields.members[0], member_name: e.target.value },
            fields.members[1],
            fields.members[2],
          ]),
      },
      {
        key: "class1",
        label: "Évfolyam",
        errorFlag: false,
        errorMsg: "",
        value: fields.members[0].member_class,
        type: "dropdown",
        options: classOptions,
        required: true,
        onChange: (e) =>
          onChange("members", [
            { ...fields.members[0], member_class: e.target.value },
            fields.members[1],
            fields.members[2],
          ]),
      },
    ],
    [
      {
        key: "name2",
        label: "2. csapattag",
        errorFlag: false,
        errorMsg: "",
        value: fields.members[1].member_name,
        type: "text",
        required: true,
        onChange: (e) =>
          onChange("members", [
            fields.members[0],
            { ...fields.members[1], member_name: e.target.value },
            fields.members[2],
          ]),
      },
      {
        key: "class2",
        label: "Évfolyam",
        errorFlag: false,
        errorMsg: "",
        value: fields.members[1].member_class,
        type: "dropdown",
        options: classOptions,
        required: true,
        onChange: (e) =>
          onChange("members", [
            fields.members[0],
            { ...fields.members[1], member_class: e.target.value },
            fields.members[2],
          ]),
      },
    ],
    [
      {
        key: "name3",
        label: "3. csapattag",
        errorFlag: false,
        errorMsg: "",
        value: fields.members[2].member_name,
        type: "text",
        required: true,
        onChange: (e) =>
          onChange("members", [
            fields.members[0],
            fields.members[1],
            { ...fields.members[2], member_name: e.target.value },
          ]),
      },
      {
        key: "class3",
        label: "Évfolyam",
        errorFlag: false,
        errorMsg: "",
        value: fields.members[2].member_name,
        type: "dropdown",
        options: classOptions,
        required: true,
        onChange: (e) =>
          onChange("members", [
            fields.members[0],
            fields.members[1],
            { ...fields.members[2], member_class: e.target.value },
          ]),
      },
    ],
    [
      {
        key: "extraName",
        label: "Pót csapattag",
        errorFlag: false,
        errorMsg: "",
        value: fields.replacement_member?.member_name ?? "",
        type: "text",
        onChange: (e) =>
          onChange(
            "replacement_member",
            e.target.value
              ? {
                  member_name: e.target.value,
                  member_class: fields.replacement_member?.member_class ?? "",
                }
              : null,
          ),
      },
      {
        key: "extraClass",
        label: "Évfolyam",
        errorFlag: false,
        errorMsg: "",
        value: fields.replacement_member?.member_class ?? "",
        type: "dropdown",
        options: classOptions,
        onChange: (e) =>
          onChange(
            "replacement_member",
            fields.replacement_member
              ? {
                  member_name: fields.replacement_member.member_name,
                  member_class: e.target.value,
                }
              : null,
          ),
      },
    ],
    {
      key: "teachers",
      label: "Felkészítő tanárok",
      errorFlag: !isTeachersEnough,
      errorMsg: "Min. egy tanár megadása kötelező!",
      type: "multi-input",
      values: fields.sherpa_teachers,
      getAddButton: () => (
        <Button
          onClick={() => {
            onChange("sherpa_teachers", [...fields.sherpa_teachers, ""]);
          }}
          color={"primary"}
        >
          Felkészítőtanár hozzáadása <UserPlusIcon className="w-5" />
        </Button>
      ),
      getRemoveButton: (index) => (
        <Button
          onClick={() => {
            const newTeachers = fields.sherpa_teachers.slice();
            newTeachers.splice(index, 1);
            onChange("sherpa_teachers", newTeachers);
          }}
          color={"error"}
        >
          <UserMinusIcon className="w-5 text-slate-50" />
        </Button>
      ),
      configs: fields.sherpa_teachers.map((teacher, index) => ({
        key: `teacher-${index}`,
        label: `${index + 1}. felkészítő tanár`,
        errorFlag: false,
        errorMsg: "",
        value: teacher,
        type: "text",
        required: true,
        onChange: (e) => {
          const newTeachers = fields.sherpa_teachers.slice();
          newTeachers[index] = e.target.value;
          onChange("sherpa_teachers", newTeachers);
        },
      })),
    },
    {
      key: "category",
      label: "Kategória",
      errorFlag: false,
      errorMsg: "",
      value:
        categories.find(
          (category) => category.category_id === fields.category_id,
        )?.category_name ?? "",
      type: "dropdown",
      required: true,
      onChange: (e) => {
        onChange(
          "category_id",
          categories.find(
            (category) => category.category_name === e.target.value,
          )?.category_id ?? 0,
        );
      },
      options: categories.map((category) => category.category_name),
    },
    {
      key: "language",
      label: "Programozási nyelv",
      errorFlag: false,
      errorMsg: "",
      value:
        languages.find((lang) => lang.lang_id === fields.lang_id)?.lang_name ??
        "",
      type: "dropdown",
      required: true,
      onChange: (e) =>
        onChange(
          "lang_id",
          languages.find((lang) => lang.lang_name === e.target.value)
            ?.lang_id ?? 0,
        ),
      options: languages.map((lang) => lang.lang_name),
    },
  ];

  return config;
};

export const GetRegistrationConfig: GetConfig<
  TeamRegistration,
  {
    schools: SchoolWithId[];
    languages: LanguageWithId[];
    categories: CategoryWithId[];
  }
> = (onChange, fields, { schools, languages, categories }): Config[] => {
  // extend LoginConfig
  let config = GetLoginConfig(
    onChange,
    {
      username: fields.username,
      password: fields.password,
    },
    null,
  );
  config = config.concat(
    GetEditConfig(onChange, fields, { languages, categories }),
  );
  config = config.concat([
    {
      key: "schoolName",
      label: "Iskola neve",
      errorFlag: false,
      errorMsg: "",
      value:
        schools.find((school) => school.school_id === fields.school_id)
          ?.school_name ?? "",
      type: "dropdown",
      options: schools.map((school) => school.school_name),
      required: true,
      onChange: (e) =>
        onChange(
          "school_id",
          schools.find((school) => school.school_name === e.target.value)
            ?.school_id ?? 0,
        ),
    },
    {
      key: "teamName",
      label: "Csapatnév",
      errorFlag: false,
      errorMsg: "",
      value: fields.team_name,
      type: "text",
      required: true,
      onChange: (e) => onChange("team_name", e.target.value),
    },
  ]);

  const isPasswordTooShort = fields.password.length <= 8;

  const findPassword = (config: Config[]): SingleConfig | null => {
    for (const item of config) {
      if (Array.isArray(item)) {
        return findPassword(item);
      } else {
        if (item.key === "password") {
          return item as SingleConfig;
        }
      }
    }

    return null;
  };

  const passwordField = findPassword(config);
  if (passwordField) {
    passwordField.errorFlag = isPasswordTooShort;
  }

  return config;
};
