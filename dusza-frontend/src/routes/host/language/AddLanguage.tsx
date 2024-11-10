import { FormFactory } from "../../../components/FormFactory.tsx";
import { useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { GetAddLanguageConfig } from "../../../helpers/form-configs/Language.tsx";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { Language } from "../../../helpers/models.ts";
import { useNavigate } from "react-router-dom";

export const AddLanguage = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState<Language>({
    lang_name: "",
  });

  const onChange = (fieldName: keyof typeof fields, value: string) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
  };

  const onSubmit = () => {
    AXIOS_INSTANCE.post("/language/", fields).then((res) => {
      console.log(res.data);
      navigate("/host/languages");
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
