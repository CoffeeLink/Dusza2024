import { useState } from "react";
import { Artboard } from "react-daisyui";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetEditCategoryConfig } from "../../../components/form-configs/Category.tsx";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <div className="w-full flex flex-col gap-2 items-center">
      <h1 className="w-full text-center text-4xl">Edit Category</h1>

      <Artboard className="w-fit bg-white p-2">
        <FormFactory
          configs={GetEditCategoryConfig(onChange, fields)}
          submit={{
            text: "Edit",
            onSubmit,
          }}
        />
      </Artboard>
    </div>
  );
};
