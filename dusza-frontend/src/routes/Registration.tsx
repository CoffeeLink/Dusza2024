import { useState, useEffect } from "react";
import { FormFactory } from "../components/FormFactory.tsx";
import { GetRegistrationConfig } from "../helpers/form-configs/Team.tsx";
import axios from "axios";
import { Optional } from "utility-types";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { MiddlePanel } from "../components/middle/MiddlePanel.tsx";
import { Category, Language, School } from "../helpers/models.ts";
import { AXIOS_INSTANCE } from "../main.tsx";

export const Registration = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [fields, setFields] = useState({
    username: "",
    password: "",
    name1: "",
    class1: "",
    name2: "",
    class2: "",
    name3: "",
    class3: "",
    extraName: "",
    extraClass: "",
    teachers: [""],
    teamName: "",
    language: "",
    schoolName: "",
    category: "",
  });

  useEffect(() => {
    AXIOS_INSTANCE.get("/school/").then((res) => {
      setSchools(JSON.parse(res.data));
    });
  }, []);

  useEffect(() => {
    AXIOS_INSTANCE.get("/language/").then((res) => {
      setLanguages(JSON.parse(res.data));
    });
  }, []);

  useEffect(() => {
    AXIOS_INSTANCE.get("/category/").then((res) => {
      setCategories(JSON.parse(res.data));
    });
  }, []);

  const onChange = (
    // fields keys
    fieldName: keyof typeof fields,
    value: (typeof fields)[keyof typeof fields],
  ) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

  const registrationButtonText: string | JSX.Element = (
    <>
      Csapat regisztrálása <PaperAirplaneIcon className="w-5" />
    </>
  );

  const onSubmit = () => {
    const newFields = { ...fields } as Optional<
      typeof fields,
      "extraName" | "extraClass"
    >;

    if (newFields.extraName === "") {
      delete newFields.extraName;
      delete newFields.extraClass;
    }

    axios.post("/api/team/register", newFields).then((res) => {
      console.log(res.data);
      window.location.href = "/";
    });
  };
  return (
    <div className="max-w-3xl flex flex-col gap-4 justify-center">
      <MiddlePanel
        title="Regisztráció"
        leftButtonTitle={"Főoldal"}
        leftButtonURL={"/"}
      >
        <div className="form-width">
          <FormFactory
            configs={GetRegistrationConfig(onChange, fields, {
              schools: schools.map((school) => school.school_name),
              languages: languages.map((language) => language.lang_name),
              categories: categories.map((category) => category.category_name),
            })}
            submit={{
              onSubmit,
              text: registrationButtonText,
            }}
          />
        </div>
      </MiddlePanel>
    </div>
  );
};
