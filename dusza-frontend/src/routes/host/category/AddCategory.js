import { jsx as _jsx } from "react/jsx-runtime";
import { GetAddCategoryConfig } from "../../../helpers/form-configs/Category.tsx";
import { FormFactory } from "../../../components/FormFactory.tsx";
import { useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { useNavigate } from "react-router-dom";
import { formatDateToStupidRustFormat } from "../../../helpers/time.ts";
export const AddCategory = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        category_name: "",
        category_description: "",
        category_deadline: "",
        category_state: "Open",
    });
    const onChange = (fieldName, value) => {
        setFields((prev) => ({ ...prev, [fieldName]: value }));
    };
    const onSubmit = () => {
        // parse date to rfc3339 and remove trailing Z
        AXIOS_INSTANCE.post("/category/", {
            ...fields,
            category_deadline: formatDateToStupidRustFormat(fields.category_deadline),
        }).then(() => {
            console.log("Added category with name", fields.category_name);
            navigate("/host/categories");
        });
    };
    return (_jsx(MiddlePanel, { title: "Add Category", children: _jsx(FormFactory
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        , { 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            configs: GetAddCategoryConfig(onChange, fields, null), submit: {
                text: "Hozzáadás",
                onSubmit,
            } }) }));
};
