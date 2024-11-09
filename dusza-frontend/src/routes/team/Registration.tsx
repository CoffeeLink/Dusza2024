import { useState, useEffect } from "react";
import { FormFactory } from "../../components/FormFactory.tsx";
import { GetRegistrationConfig } from "../../helpers/form-configs/Team.tsx";
import axios from "axios";
import { Optional } from "utility-types";
import { Artboard } from "react-daisyui";

export const Registration = () => {
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
  });

  const [schools, setSchools] = useState<string[]>([]);

  useEffect(() => {
    // axios.get("/api/schools").then((res) => {
    //   setSchools(res.data);
    // });

    setSchools(["School 1", "School 2", "School 3"]);
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
    <div className="w-full flex flex-col gap-2 items-center">
      <h1 className="text-center text-4xl w-fit">Register</h1>
      <Artboard className="gap-2 p-4 bg-white w-fit">
        <FormFactory
          configs={GetRegistrationConfig(onChange, fields, { schools })}
          submit={{
            onSubmit,
            text: "Register",
          }}
        />
      </Artboard>
    </div>
  );
};
