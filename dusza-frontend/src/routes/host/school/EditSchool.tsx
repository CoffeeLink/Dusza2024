import axios from "axios";
import { Artboard } from "react-daisyui";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetEditSchoolConfig } from "../../../components/form-configs/School.tsx";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const EditSchool = () => {
  // get id from url react router
  const { id } = useParams<{ id: string }>();

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
    axios.put("/api/schools", { ...fields, id }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <h1 className="text-center text-4xl w-fit">Edit school</h1>
      <Artboard className="bg-white p-4 pt-2 w-fit">
        <FormFactory
          configs={GetEditSchoolConfig(onChange, fields)}
          submit={{
            onSubmit,
            text: "Edit School",
          }}
        />
      </Artboard>
    </div>
  );
};
