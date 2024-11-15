import { useEffect, useState } from "react";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetEditLanguageConfig } from "../../../helpers/form-configs/Language.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { Language, LanguageWithId } from "../../../helpers/models.ts";
import { API_URL, AXIOS_INSTANCE } from "../../../main.tsx";

export const EditLanguage = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [fields, setFields] = useState<Language>({
    lang_name: "",
  });

  useEffect(() => {
    AXIOS_INSTANCE.get(API_URL + `/language/${id}`).then((response) => {
      const data: LanguageWithId = JSON.parse(response.data);
      setFields(data);
    });
  }, [id]);

  const onChange = (fieldName: keyof typeof fields, value: string) => {
    setFields((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = () => {
    AXIOS_INSTANCE.put(`/language/${id}`, { ...fields }).then(() => {
      console.log("Edited category with name", fields.lang_name);
      navigate("/host/languages");
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
