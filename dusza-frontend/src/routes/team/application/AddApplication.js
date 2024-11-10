import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetAddApplicationConfig } from "../../../helpers/form-configs/Application.tsx";
export const AddApplication = () => {
    const [categories, setCategories] = useState([]);
    const [schools, setSchools] = useState([]);
    const [languages, setLanguages] = useState([]);
    useEffect(() => {
        // Fetch categories
        // axios.get("/api/categories/available").then((response) => {
        //   // Set categories
        // }
        setCategories(["Category 1", "Category 2", "Category 3"]);
    }, []);
    useEffect(() => {
        // Fetch schools
        // axios.get("/api/schools/available").then((response) => {
        //   // Set schools
        // }
        setSchools(["School 1", "School 2", "School 3"]);
    }, []);
    useEffect(() => {
        // Fetch languages
        // axios.get("/api/languages/available").then((response) => {
        //   // Set languages
        // }
        setLanguages(["Language 1", "Language 2", "Language 3"]);
    }, []);
    const [fields, setFields] = useState({
        category: "",
        school: "",
        language: "",
    });
    const onChange = (fieldName, value) => {
        setFields({
            ...fields,
            [fieldName]: value,
        });
    };
    const onSubmit = () => {
        // axios.post("/api/applications", fields).then((res) => {
        //   console.log(res.data);
        // });
    };
    return (_jsx(MiddlePanel, { title: "Új jelentkezés", children: _jsx(FormFactory, { configs: GetAddApplicationConfig(onChange, fields, {
                categories,
                schools,
                languages,
            }), submit: {
                onSubmit,
                text: "Jelentkezés",
            } }) }));
};