import React from "react";
import { FormFactory } from "../../components/FormFactory.tsx";
import { GetEditConfig } from "../../helpers/form-configs/Team.tsx";
import axios from "axios";
import { Optional } from "utility-types";
import { useNavigate } from "react-router-dom";
import { MiddlePanel } from "../../components/middle/MiddlePanel.tsx";

export const Edit = () => {
  const navigate = useNavigate();

  const [languages, setLanguages] = React.useState<string[]>([]);

  React.useEffect(() => {
    // axios.get("/api/languages").then((res) => {
    //   setLanguages(res.data);
    // });

    setLanguages(["Language 1", "Language 2", "Language 3"]);
  }, []);

  const [fields, setFields] = React.useState({
    name1: "",
    class1: "",
    name2: "",
    class2: "",
    name3: "",
    class3: "",
    extraName: "",
    extraClass: "",
    teachers: [""],
    language: "",
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

  const onSubmit = () => {
    const newFields = { ...fields } as Optional<
      typeof fields,
      "extraName" | "extraClass"
    >;

    if (newFields.extraName === "") {
      delete newFields.extraName;
      delete newFields.extraClass;
    }

    axios.post("/api/team/edit", newFields).then((res) => {
      console.log(res.data);
      navigate("/team");
    });
  };

  return (
    // <div className="w-full flex flex-col gap-2 items-center">
    //   <h1 className="text-center text-4xl w-fit">Edit team</h1>
    <MiddlePanel title="Edit team">
      <FormFactory
        configs={GetEditConfig(onChange, fields, { languages })}
        submit={{
          onSubmit,
          text: "Edit",
        }}
      />
    </MiddlePanel>
  );
};
