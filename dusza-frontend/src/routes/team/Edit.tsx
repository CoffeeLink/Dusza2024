import React, { useEffect, useState } from "react";
import { FormFactory } from "../../components/FormFactory.tsx";
import { GetEditConfig } from "../../helpers/form-configs/Team.tsx";
import axios from "axios";
import { Optional } from "utility-types";
import { MiddlePanel } from "../../components/middle/MiddlePanel.tsx";
import {
  CategoryWithId,
  LanguageWithId,
  SchoolWithId,
  TeamEdit,
  TeamWithId,
  UserWithId,
} from "../../helpers/models.ts";
import { AXIOS_INSTANCE } from "../../main.tsx";
import { useNavigate } from "react-router-dom";

export const Edit = () => {
  const navigate = useNavigate();
  //
  // const [languages, setLanguages] = React.useState<string[]>([]);
  //
  // React.useEffect(() => {
  //   // axios.get("/api/languages").then((res) => {
  //   //   setLanguages(res.data);
  //   // });
  //
  //   setLanguages(["Language 1", "Language 2", "Language 3"]);
  // }, []);
  //
  // React.useEffect(() => {
  //   // axios.get("/api/categories").then((res) => {
  //   //   setCategories(res.data);
  //   // });
  //
  //   setCategories(["Category 1", "Category 2", "Category 3"]);
  // }, []);
  //
  // React.useEffect(() => {
  //   // axios.get("/api/schools").then((res) => {
  //   //   setSchools(res.data);
  //   // });
  //
  //   setSchools(["School 1", "School 2", "School 3"]);
  // }, []);
  //
  // const [fields, setFields] = React.useState({
  //   team_id: 1,
  //   team_name: "Team 1",
  //   schoolId: 1,
  //   members: [
  //     {
  //       name: "Member 1",
  //       class: "Class 1",
  //     },
  //     {
  //       name: "Member 2",
  //       class: "Class 2",
  //     },
  //   ],
  //   replacement_member: {
  //     name: "Replacement 1",
  //     class: "Class 1",
  //   },
  //   categoryId: 1,
  //   langId: 1,
  //   sherpa_teachers: ["Teacher 1", "Teacher 2"],
  //   team_approval_state: "WaitingForApproval",
  // });
  //
  // const onChange = (
  //   // fields keys
  //   fieldName: keyof typeof fields,
  //   value: (typeof fields)[keyof typeof fields],
  // ) => {
  //   setFields({
  //     ...fields,
  //     [fieldName]: value,
  //   });
  // };
  //
  // const onSubmit = () => {
  //   const newFields = { ...fields } as Optional<
  //     typeof fields,
  //     "replacement_member"
  //   >;
  //
  //   if (newFields.replacement_member === null) {
  //     delete newFields.replacement_member;
  //   }
  //
  //   axios.post("/api/team/edit", newFields).then((res) => {
  //     console.log(res.data);
  //     navigate("/team");
  //   });
  // };
  //
  // return (
  //   // <div className="w-full flex flex-col gap-2 items-center">
  //   //   <h1 className="text-center text-4xl w-fit">Edit team</h1>
  //   <MiddlePanel title="Edit team">
  //     <FormFactory
  //       configs={GetEditConfig(onChange, fields, { languages })}
  //       submit={{
  //         onSubmit,
  //         text: "Edit",
  //       }}
  //     />
  //   </MiddlePanel>

  const [languages, setLanguages] = useState<LanguageWithId[] | null>(null);
  const [schools, setSchools] = useState<SchoolWithId[] | null>(null);
  const [categories, setCategories] = useState<CategoryWithId[] | null>(null);

  const [fields, setFields] = React.useState<TeamEdit>({
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
  });

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

  useEffect(() => {
    AXIOS_INSTANCE.get("/user/self").then((res) => {
      // Get all teams
      AXIOS_INSTANCE.get("/team/").then((res2) => {
        // Find the team
        const me = JSON.parse(res.data) as UserWithId;
        const teams = JSON.parse(res2.data) as TeamWithId[];
        const myTeam = teams.find((team) => team.user.user_id === me.user_id)!;

        setFields({
          team_name: myTeam.team_name,
          school_id: myTeam.school.school_id,
          members: myTeam.members,
          replacement_member: myTeam.replacement_member,
          category_id: myTeam.category.category_id,
          lang_id: myTeam.lang.lang_id,
          sherpa_teachers: myTeam.sherpa_teachers.map(
            (teacher) => teacher.teacher_name,
          ),
        });
      });
    });
  }, []);

  const onSubmit = () => {
    const newFields = { ...fields } as Optional<
      typeof fields,
      "replacement_member"
    >;

    if (newFields.replacement_member === null) {
      delete newFields.replacement_member;
    }

    axios.post("/api/team/edit", newFields).then((res) => {
      navigate("/team");
      console.log(res.data);
    });
  };

  if (languages === null || schools === null || categories === null) {
    return <MiddlePanel title="Edit team">Loading...</MiddlePanel>;
  }

  return (
    <MiddlePanel title="Edit team">
      <FormFactory
        configs={GetEditConfig(onChange, fields, { languages, categories })}
        submit={{
          onSubmit,
          text: "Edit",
        }}
      />
    </MiddlePanel>
  );
};
