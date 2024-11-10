import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { GetEditApplicationConfig } from "../../../helpers/form-configs/Application.tsx";
export const EditApplication = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [fields, setFields] = useState({
        name: "",
        category: "",
        language: "",
        school: "",
        registeredAt: new Date(),
        state_school: "pending",
        state_host: "pending",
    });
    const [categories, setCategories] = useState([]);
    const [schools, setSchools] = useState([]);
    const [languages, setLanguages] = useState([]);
    useEffect(() => {
        AXIOS_INSTANCE.get(`/application/${id}`).then((res) => {
            const data = JSON.parse(res.data);
            setFields(data);
        });
    }, [id]);
    useEffect(() => {
        AXIOS_INSTANCE.get("/category").then((res) => {
            const data = JSON.parse(res.data);
            setCategories(data.map((category) => category.category_name));
        });
    }, []);
    useEffect(() => {
        AXIOS_INSTANCE.get("/school").then((res) => {
            const data = JSON.parse(res.data);
            setSchools(data.map((school) => school.school_name));
        });
    }, []);
    useEffect(() => {
        AXIOS_INSTANCE.get("/language").then((res) => {
            const data = JSON.parse(res.data);
            setLanguages(data.map((language) => language.lang_name));
        });
    }, []);
    const onChange = (fieldName, value) => {
        setFields((prev) => ({ ...prev, [fieldName]: value }));
    };
    const onSubmit = () => {
        AXIOS_INSTANCE.put(`/application/${id}`, { ...fields }).then(() => {
            console.log("Edited application with name", fields.name);
            navigate("/team/application");
        });
    };
    return (_jsx(MiddlePanel, { title: "Kategória szerkesztése", children: _jsx(FormFactory, { configs: GetEditApplicationConfig(onChange, fields, {
                categories,
                schools,
                languages,
            }), submit: {
                text: "Mentés",
                onSubmit,
            } }) }));
};
