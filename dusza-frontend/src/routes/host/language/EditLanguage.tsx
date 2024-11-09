import { useEffect, useState } from "react";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetEditLanguageConfig } from "../../../helpers/form-configs/Language.tsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { Language, LanguageWithId } from "../../../helpers/models.ts";
import { API_URL } from "../../../main.tsx";

export const EditLanguage = () => {
  const { id } = useParams<{ id: string }>();

  const [fields, setFields] = useState<Language>({
    lang_name: "",
  });

  useEffect(() => {
    axios.get(API_URL + `/language/${id}`).then((response) => {
      const data: LanguageWithId = JSON.parse(response.data);
      setFields(data);
    });
  }, [id]);

  const onChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    axios.put(API_URL + `/language/${id}`, { ...fields }).then(() => {
      console.log("Edited category with name", fields.lang_name);
    });
  };

  return (
    <MiddlePanel title={"Nyelv szerkesztése"}>
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
