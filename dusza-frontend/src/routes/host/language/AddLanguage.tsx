import axios from "axios";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { GetAddLanguageConfig } from "../../../helpers/form-configs/Language.tsx";

export const AddLanguage = () => {
  const [fields, setFields] = useState({
    name: "",
  });

  const onChange = (fieldName: keyof typeof fields, value: string) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

  const onSubmit = () => {
    axios.post("/api/languages", fields).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <MiddlePanel title={"Új programozási nyelv"}>
      <FormFactory
        configs={GetAddLanguageConfig(onChange, fields, null)}
        submit={{
          onSubmit,
          text: "Hozzáadás",
        }}
      />
    </MiddlePanel>
  );
};
