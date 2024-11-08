import React from "react";
import { FormFactory } from "../components/FormFactory.tsx";
import { GetRegistrationConfig } from "../components/TeamFormConfigs.tsx";

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
    teacher: "",
    teamName: "",
    language: "",
    schoolName: "",
  });

  const onChange = (fieldName: string, value: string) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

  return (
    <div>
      <h1>Registration</h1>

      <FormFactory configs={GetRegistrationConfig(onChange, fields)} />
    </div>
  );
};
