import React from "react";
import { FormFactory } from "../components/FormFactory.tsx";
import { GetLoginConfig } from "../components/TeamFormConfigs.tsx";
import axios from "axios";

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

  const onSubmit = () => {
    axios.post("/api/login", fields).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <h1>Login</h1>

      <FormFactory configs={GetLoginConfig(onChange, fields)} />

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};
