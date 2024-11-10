import { useState, useEffect } from "react";
import { FormFactory } from "../components/FormFactory.tsx";
import { GetRegistrationConfig } from "../helpers/form-configs/Team.tsx";
import { Optional } from "utility-types";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { MiddlePanel } from "../components/middle/MiddlePanel.tsx";
import {
  CategoryWithId,
  LanguageWithId,
  SchoolWithId,
  TeamRegistration,
} from "../helpers/models.ts";
import { AXIOS_INSTANCE } from "../main.tsx";

export const Registration = () => {
  const [languages, setLanguages] = useState<LanguageWithId[] | null>(null);
  const [schools, setSchools] = useState<SchoolWithId[] | null>(null);
  const [categories, setCategories] = useState<CategoryWithId[] | null>(null);

  const [fields, setFields] = useState<TeamRegistration>({
    team_name: "",
    school_id: 0,
    members: [
      {
        member_name: "",
        member_class: "",
      },
      {
        member_name: "",
        member_class: "",
      },
      {
        member_name: "",
        member_class: "",
      },
    ],
    replacement_member: null,
    category_id: 0,
    lang_id: 0,
    sherpa_teachers: [],
    username: "",
    password: "",
  });

  useEffect(() => {
    AXIOS_INSTANCE.get("/school/").then((res) => {
      setFields((prev) => ({
        ...prev,
        school_id: JSON.parse(res.data)[0].school_id,
      }));
      setSchools(JSON.parse(res.data));
    });
  }, []);

  useEffect(() => {
    AXIOS_INSTANCE.get("/language/").then((res) => {
      setFields((prev) => ({
        ...prev,
        lang_id: JSON.parse(res.data)[0].lang_id,
      }));
      setLanguages(JSON.parse(res.data));
    });
  }, []);

  useEffect(() => {
    AXIOS_INSTANCE.get("/category/").then((res) => {
      setFields((prev) => ({
        ...prev,
        category_id: JSON.parse(res.data)[0].category_id,
      }));
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
      "replacement_member"
    >;

    if (newFields.replacement_member?.member_name === "") {
      delete newFields.replacement_member;
    }

    AXIOS_INSTANCE.post("/team/", newFields).then(() => {
      console.log("Registered team with name", fields.team_name);
      window.location.href = "/";
    });
  };

  if (!schools || !languages || !categories) {
    return null;
  }

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
              schools,
              languages,
              categories,
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
