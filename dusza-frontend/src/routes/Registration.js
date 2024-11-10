import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FormFactory } from "../components/FormFactory.tsx";
import { GetRegistrationConfig } from "../helpers/form-configs/Team.tsx";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { MiddlePanel } from "../components/middle/MiddlePanel.tsx";
import { AXIOS_INSTANCE } from "../main.tsx";
export const Registration = () => {
    const [languages, setLanguages] = useState(null);
    const [schools, setSchools] = useState(null);
    const [categories, setCategories] = useState(null);
    const [fields, setFields] = useState({
        team_name: "",
        school_id: 0,
        members: [
            {
                member_name: "",
                member_class: "",
            },
            {
                member_name: "",
                member_class: "",
            },
            {
                member_name: "",
                member_class: "",
            },
        ],
        replacement_member: null,
        category_id: 0,
        lang_id: 0,
        sherpa_teachers: [],
        username: "",
        password: "",
    });
    useEffect(() => {
        AXIOS_INSTANCE.get("/school/").then((res) => {
            setFields((prev) => ({
                ...prev,
                school_id: JSON.parse(res.data)[0].school_id,
            }));
            setSchools(JSON.parse(res.data));
        });
    }, []);
    useEffect(() => {
        AXIOS_INSTANCE.get("/language/").then((res) => {
            setFields((prev) => ({
                ...prev,
                lang_id: JSON.parse(res.data)[0].lang_id,
            }));
            setLanguages(JSON.parse(res.data));
        });
    }, []);
    useEffect(() => {
        AXIOS_INSTANCE.get("/category/").then((res) => {
            setFields((prev) => ({
                ...prev,
                category_id: JSON.parse(res.data)[0].category_id,
            }));
            setCategories(JSON.parse(res.data));
        });
    }, []);
    const onChange = (
    // fields keys
    fieldName, value) => {
        setFields({
            ...fields,
            [fieldName]: value,
        });
    };
    const registrationButtonText = (_jsxs(_Fragment, { children: ["Csapat regisztr\u00E1l\u00E1sa ", _jsx(PaperAirplaneIcon, { className: "w-5" })] }));
    const onSubmit = () => {
        const newFields = { ...fields };
        if (newFields.replacement_member?.member_name === "") {
            delete newFields.replacement_member;
        }
        AXIOS_INSTANCE.post("/team/", newFields).then(() => {
            console.log("Registered team with name", fields.team_name);
            window.location.href = "/";
        });
    };
    if (!schools || !languages || !categories) {
        return null;
    }
    return (_jsx("div", { className: "max-w-3xl flex flex-col gap-4 justify-center", children: _jsx(MiddlePanel, { title: "Regisztr\u00E1ci\u00F3", leftButtonTitle: "Főoldal", leftButtonURL: "/", children: _jsx("div", { className: "form-width", children: _jsx(FormFactory, { configs: GetRegistrationConfig(onChange, fields, {
                        schools,
                        languages,
                        categories,
                    }), submit: {
                        onSubmit,
                        text: registrationButtonText,
                    } }) }) }) }));
};
