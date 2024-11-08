import React from "react";
import { FormFactory } from "../components/FormFactory.tsx";
import { GetRegistrationConfig } from "../components/TeamFormConfigs.tsx";
import axios from "axios";
import { Optional } from "utility-types";
import { Artboard } from "react-daisyui";

export const Registration = () => {
  const [fields, setFields] = React.useState({
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

    axios.post("/api/team/register", newFields).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <Artboard className="gap-2 p-4">
      <h1 className="text-2xl">Registration</h1>
      <FormFactory
        configs={GetRegistrationConfig(onChange, fields)}
        submit={{
          onSubmit,
          text: "Register",
        }}
      />
    </Artboard>
  );
};
