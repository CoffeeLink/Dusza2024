import axios from "axios";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetEditSchoolConfig } from "../../../helpers/form-configs/School.tsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";

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
    <MiddlePanel title={"Edit School"}>
      <FormFactory
        configs={GetEditSchoolConfig(onChange, fields, null)}
        submit={{
          onSubmit,
          text: "Edit School",
        }}
      />
    </MiddlePanel>
  );
};
