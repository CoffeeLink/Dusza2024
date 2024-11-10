import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { FormFactory } from "../components/FormFactory.tsx";
import { GetLoginConfig } from "../helpers/form-configs/Team.tsx";
import { MiddlePanel } from "../components/middle/MiddlePanel.tsx";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { AXIOS_INSTANCE } from "../main.tsx";
export const Login = () => {
    const [fields, setFields] = React.useState({
        username: "",
        password: "",
    });
    const loginButtonText = (_jsxs(_Fragment, { children: ["Bejelentkez\u00E9s", " ", _jsx(ArrowRightEndOnRectangleIcon, { className: "pt-0.5 h-4.5 w-5" })] }));
    const onChange = (
    // fields keys
    fieldName, value) => {
        setFields({
            ...fields,
            [fieldName]: value,
        });
    };
    const onSubmit = () => {
        AXIOS_INSTANCE.post("/login", fields).then((res) => {
            console.log(res.data);
            // force refresh
            window.location.href = "/";
        });
    };
    return (_jsx("div", { className: "max-w-3xl flex flex-col gap-4 justify-center", children: _jsx(MiddlePanel, { title: "Bejelentkez\u00E9s", leftButtonTitle: "Főoldal", leftButtonURL: "/", children: _jsx("div", { className: "w-full flex flex-col gap-2 items-center", children: _jsx("div", { className: "form-width", children: _jsx(FormFactory, { configs: GetLoginConfig(onChange, fields, null), submit: {
                            onSubmit,
                            text: loginButtonText,
                        } }) }) }) }) }));
};
