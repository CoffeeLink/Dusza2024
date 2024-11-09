import axios from "axios";
import { Artboard } from "react-daisyui";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetAddSchoolConfig } from "../../../components/form-configs/School.tsx";
import { useState } from "react";

export const AddSchool = () => {
  const [fields, setFields] = useState({
    name: "",
    location: "",
    username: "",
    password: "",
    contactName: "",
    contactEmail: "",
  });

  const onChange = (fieldName: keyof typeof fields, value: string) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

  const onSubmit = () => {
    axios.post("/api/schools", fields).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <h1 className="w-full text-center text-4xl">Add school</h1>

      <Artboard className="w-fit bg-white p-4 pt-2">
        <FormFactory
          configs={GetAddSchoolConfig(onChange, fields)}
          submit={{
            onSubmit,
            text: "Add School",
          }}
        />
      </Artboard>
    </div>
  );
};
