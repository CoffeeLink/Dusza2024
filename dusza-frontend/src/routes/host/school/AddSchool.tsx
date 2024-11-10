import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetAddSchoolConfig } from "../../../helpers/form-configs/School.tsx";
import { useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { useNavigate } from "react-router-dom";
import { SchoolRegistration } from "../../../helpers/models.ts";

export const AddSchool = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState<SchoolRegistration>({
    username: "",
    password: "",
    school_name: "",
    school_address: "",
    school_rep_name: "",
    school_rep_email: "",
  });

  const onChange = (fieldName: keyof typeof fields, value: string) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

  const onSubmit = () => {
    AXIOS_INSTANCE.post("/school/", fields).then(() => {
      console.log("Added school with name", fields.school_name);
      navigate("/host/schools");
    });
  };

  return (
    <MiddlePanel title={"Új iskola"}>
      <FormFactory
        configs={GetAddSchoolConfig(onChange, fields, null)}
        submit={{
          onSubmit,
          text: "Hozzáadás",
        }}
      />
    </MiddlePanel>
  );
};
