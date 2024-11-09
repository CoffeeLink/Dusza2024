import axios from "axios";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetAddSchoolConfig } from "../../../components/form-configs/School.tsx";
import { useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";

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
    <MiddlePanel title={"Add School"}>
      <FormFactory
        configs={GetAddSchoolConfig(onChange, fields)}
        submit={{
          onSubmit,
          text: "Add School",
        }}
      />
    </MiddlePanel>
  );
};
