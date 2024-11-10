import { jsx as _jsx } from "react/jsx-runtime";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { GetEditSchoolConfig } from "../../../helpers/form-configs/School.tsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AXIOS_INSTANCE } from "../../../main.tsx";
export const EditSchool = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [fields, setFields] = useState({
        school_name: "",
        school_address: "",
        school_rep_name: "",
        school_rep_email: "",
    });
    useEffect(() => {
        AXIOS_INSTANCE.get(`/school/${id}`).then((res) => {
            setFields(JSON.parse(res.data));
        });
    }, [id]);
    const onChange = (fieldName, value) => {
        setFields({
            ...fields,
            [fieldName]: value,
        });
    };
    const onSubmit = () => {
        AXIOS_INSTANCE.put(`/school/${id}`, fields).then(() => {
            console.log("Edited school with name", fields.school_name);
            navigate("/host/schools");
        });
    };
    return (_jsx(MiddlePanel, { title: "Iskola szerkesztése", children: _jsx(FormFactory, { configs: GetEditSchoolConfig(onChange, fields, null), submit: {
                onSubmit,
                text: "Mentés",
            } }) }));
};
