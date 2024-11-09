import axios from "axios";
import { Artboard } from "react-daisyui";
import { GetAddCategoryConfig } from "../../../components/form-configs/Category.tsx";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { useState } from "react";

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
    <div className="w-full flex flex-col gap-2 items-center">
      <h1 className="w-full text-center text-4xl">Add Category</h1>

      <Artboard className="w-fit bg-white p-2">
        <FormFactory
          configs={GetAddCategoryConfig(onChange, fields)}
          submit={{
            text: "Add",
            onSubmit,
          }}
        />
      </Artboard>
    </div>
  );
};
