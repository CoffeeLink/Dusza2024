import { useEffect, useState } from "react";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetEditCategoryConfig } from "../../../helpers/form-configs/Category.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { Category } from "../../../helpers/models.ts";
import { formatDateToStupidRustFormat } from "../../../helpers/time.ts";

export const EditCategory = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [fields, setFields] = useState<Category>({
    category_name: "",
    category_description: "",
    category_deadline: "",
    category_state: "Open",
  });

  useEffect(() => {
    AXIOS_INSTANCE.get(`/category/${id}`).then((res) => {
      const data = res.data;
      setFields(data);
    });
  }, [id]);

  const onChange = (fieldName: keyof typeof fields, value: string) => {
    setFields((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = () => {
    AXIOS_INSTANCE.put(`/category/${id}`, {
      ...fields,
      category_deadline: formatDateToStupidRustFormat(fields.category_deadline),
    }).then(() => {
      console.log("Edited category with name", fields.category_name);
      navigate("/host/categories");
    });
  };

  return (
    <MiddlePanel title={"Kategória szerkesztése"}>
      <FormFactory
        configs={GetEditCategoryConfig(onChange, fields, null)}
        submit={{
          text: "Mentés",
          onSubmit,
        }}
      />
    </MiddlePanel>
  );
};
