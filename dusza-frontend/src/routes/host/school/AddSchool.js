import { jsx as _jsx } from "react/jsx-runtime";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetAddSchoolConfig } from "../../../helpers/form-configs/School.tsx";
import { useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { useNavigate } from "react-router-dom";
export const AddSchool = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        username: "",
        password: "",
        school_name: "",
        school_address: "",
        school_rep_name: "",
        school_rep_email: "",
    });
    const onChange = (fieldName, value) => {
        setFields({
            ...fields,
            [fieldName]: value,
        });
    };
    const onSubmit = () => {
        AXIOS_INSTANCE.post("/school/", fields).then(() => {
            console.log("Added school with name", fields.school_name);
            navigate("/host/schools");
        });
    };
    return (_jsx(MiddlePanel, { title: "Új iskola", children: _jsx(FormFactory, { configs: GetAddSchoolConfig(onChange, fields, null), submit: {
                onSubmit,
                text: "Hozzáadás",
            } }) }));
};
