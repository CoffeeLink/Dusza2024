import { useState } from "react";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetEditCategoryConfig } from "../../../helpers/form-configs/Category.tsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";

export const EditCategory = () => {
  const { id } = useParams<{ id: string }>();

  const [fields, setFields] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  const onChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    axios.put("/api/categories", { ...fields, id }).then(() => {
      console.log("Edited category with name", fields.name);
    });
  };

  return (
    <MiddlePanel title={"Edit Category"}>
      <FormFactory
        configs={GetEditCategoryConfig(onChange, fields, null)}
        submit={{
          text: "Edit",
          onSubmit,
        }}
      />
    </MiddlePanel>
  );
};
