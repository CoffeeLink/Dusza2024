import { useState } from "react";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetEditLanguageConfig } from "../../../helpers/form-configs/Language.tsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";

export const EditLanguage = () => {
  const { id } = useParams<{ id: string }>();

  const [fields, setFields] = useState({
    name: "",
  });

  const onChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    axios.put("/api/languages", { ...fields, id }).then(() => {
      console.log("Edited category with name", fields.name);
    });
  };

  return (
    <MiddlePanel title={"Kategória szerkesztése"}>
      <FormFactory
        configs={GetEditLanguageConfig(onChange, fields, null)}
        submit={{
          text: "Mentés",
          onSubmit,
        }}
      />
    </MiddlePanel>
  );
};
