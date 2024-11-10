import { jsx as _jsx } from "react/jsx-runtime";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { GetAddLanguageConfig } from "../../../helpers/form-configs/Language.tsx";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { useNavigate } from "react-router-dom";
export const AddLanguage = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        lang_name: "",
    });
    const onChange = (fieldName, value) => {
        setFields({
            ...fields,
            [fieldName]: value,
        });
    };
    const onSubmit = () => {
        AXIOS_INSTANCE.post("/language/", fields).then((res) => {
            console.log(res.data);
            navigate("/host/languages");
        });
    };
    return (_jsx(MiddlePanel, { title: "Új programozási nyelv", children: _jsx(FormFactory, { configs: GetAddLanguageConfig(onChange, fields, null), submit: {
                onSubmit,
                text: "Hozzáadás",
            } }) }));
};
