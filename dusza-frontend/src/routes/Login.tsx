import React from "react";
import { FormFactory } from "../components/FormFactory.tsx";
import { GetLoginConfig } from "../helpers/form-configs/Team.tsx";
import { MiddlePanel } from "../components/middle/MiddlePanel.tsx";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { AXIOS_INSTANCE } from "../main.tsx";

export const Login = () => {
  const [fields, setFields] = React.useState({
    username: "",
    password: "",
  });

  const loginButtonText: string | React.ReactNode = (
    <>
      Bejelentkezés{" "}
      <ArrowRightEndOnRectangleIcon className="pt-0.5 h-4.5 w-5" />
    </>
  );

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
    AXIOS_INSTANCE.post("/login", fields).then((res) => {
      console.log(res.data);
      // force refresh
      window.location.href = "/";
    });
  };

  return (
    <div className="max-w-3xl flex flex-col gap-4 justify-center">
      <MiddlePanel
        title="Bejelentkezés"
        leftButtonTitle={"Főoldal"}
        leftButtonURL={"/"}
      >
        <div className="w-full flex flex-col gap-2 items-center">
          <div className="form-width">
            <FormFactory
              configs={GetLoginConfig(onChange, fields, null)}
              submit={{
                onSubmit,
                text: loginButtonText,
              }}
            />
          </div>
        </div>
      </MiddlePanel>
    </div>
  );
};
