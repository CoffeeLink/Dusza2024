import { GetAddCategoryConfig } from "../../../helpers/form-configs/Category.tsx";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { Category } from "../../../helpers/models.ts";
import { useNavigate } from "react-router-dom";

export const AddCategory = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState<Category>({
    category_name: "",
    category_description: "",
    category_deadline: "",
    category_state: "open",
  });

  const onChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    AXIOS_INSTANCE.post("/category/", fields).then(() => {
      console.log("Added category with name", fields.category_name);
      navigate("/host/categories");
    });
  };

  return (
    <MiddlePanel title={"Add Category"}>
      <FormFactory
        configs={GetAddCategoryConfig(onChange, fields, null)}
        submit={{
          text: "Hozzáadás",
          onSubmit,
        }}
      />
    </MiddlePanel>
  );
};
