import React from "react";
import { FormFactory } from "../components/FormFactory.tsx";
import { GetLoginConfig } from "../components/form-configs/Team.tsx";
import axios from "axios";
import { Artboard } from "react-daisyui";

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
    <div className="w-full flex flex-col gap-2 items-center">
      <h1 className="text-center text-4xl w-fit">Login</h1>
      <Artboard className="gap-2 p-4 bg-white w-fit">
        <FormFactory
          configs={GetLoginConfig(onChange, fields, null)}
          submit={{
            onSubmit,
            text: "Login",
          }}
        />
      </Artboard>
    </div>
  );
};
