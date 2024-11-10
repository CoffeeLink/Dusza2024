import { useEffect, useState } from "react";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { GetEditApplicationConfig } from "../../../helpers/form-configs/Application.tsx";

type Application = {
  name: string;
  category: string;
  language: string;
  school: string;
  registeredAt: Date;
  state_school: "pending" | "accepted" | "rejected";
  state_host: "pending" | "accepted" | "rejected";
};

export const EditApplication = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [fields, setFields] = useState<Application>({
    name: "",
    category: "",
    language: "",
    school: "",
    registeredAt: new Date(),
    state_school: "pending",
    state_host: "pending",
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [schools, setSchools] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    AXIOS_INSTANCE.get(`/application/${id}`).then((res) => {
      const data = JSON.parse(res.data);
      setFields(data);
    });
  }, [id]);

  useEffect(() => {
    AXIOS_INSTANCE.get("/category").then((res) => {
      const data = JSON.parse(res.data);
      setCategories(
        data.map(
          (category: { category_name: string }) => category.category_name,
        ),
      );
    });
  }, []);

  useEffect(() => {
    AXIOS_INSTANCE.get("/school").then((res) => {
      const data = JSON.parse(res.data);
      setSchools(
        data.map((school: { school_name: string }) => school.school_name),
      );
    });
  }, []);

  useEffect(() => {
    AXIOS_INSTANCE.get("/language").then((res) => {
      const data = JSON.parse(res.data);
      setLanguages(
        data.map((language: { lang_name: string }) => language.lang_name),
      );
    });
  }, []);

  const onChange = (fieldName: keyof typeof fields, value: string) => {
    setFields((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = () => {
    AXIOS_INSTANCE.put(`/application/${id}`, { ...fields }).then(() => {
      console.log("Edited application with name", fields.name);
      navigate("/team/application");
    });
  };

  return (
    <MiddlePanel title={"Kategória szerkesztése"}>
      <FormFactory
        configs={GetEditApplicationConfig(onChange, fields, {
          categories,
          schools,
          languages,
        })}
        submit={{
          text: "Mentés",
          onSubmit,
        }}
      />
    </MiddlePanel>
  );
};
