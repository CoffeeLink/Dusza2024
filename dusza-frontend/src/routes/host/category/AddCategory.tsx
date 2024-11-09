import axios from "axios";
import { GetAddCategoryConfig } from "../../../components/form-configs/Category.tsx";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";

export const AddCategory = () => {
  const [fields, setFields] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  const onChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    axios.post("/api/categories", fields).then(() => {
      console.log("Added category with name", fields.name);
    });
  };

  return (
    <MiddlePanel title={"Add Category"}>
      <FormFactory
        configs={GetAddCategoryConfig(onChange, fields, null)}
        submit={{
          text: "Add",
          onSubmit,
        }}
      />
    </MiddlePanel>
  );
};
