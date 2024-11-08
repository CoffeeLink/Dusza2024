import React from "react";
import { FormFactory } from "../components/FormFactory.tsx";
import { GetLoginConfig } from "../components/TeamFormConfigs.tsx";

export const Login = () => {
  const [fields, setFields] = React.useState({
    username: "",
    password: "",
  });

  const onChange = (
    // fields keys
    fieldName: keyof typeof fields,
    value: string,
  ) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

  return (
    <div>
      <h1>Login</h1>

      <FormFactory configs={GetLoginConfig(onChange, fields)} />
    </div>
  );
};
