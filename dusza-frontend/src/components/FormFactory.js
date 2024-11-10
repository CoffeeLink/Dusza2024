import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { Button, Form, Input, Select } from "react-daisyui";
const Wrapper = ({ children, label, errorFlag, errorMsg, required, }) => {
    return (_jsxs("div", { className: "flex flex-col w-full", children: [_jsx("label", { className: "label", children: _jsxs("span", { className: "label-text text-l", children: [label, " ", required && _jsx("span", { className: "text-error", children: "*" })] }) }), children, errorFlag && _jsx("span", { className: "text-error", children: errorMsg })] }));
};
const FormFactoryRecursive = ({ configs }) => {
    const getElement = (config) => {
        const { key, label, errorFlag, errorMsg, value, type, onChange, required } = config;
        switch (type) {
            case "text":
            case "email":
            case "number":
            case "password":
            case "date":
                return (_jsx(Wrapper, { label: label, errorFlag: errorFlag, errorMsg: errorMsg, required: required, children: _jsx(Input, { onChange: onChange, value: value, type: type, className: `bg-base-100 text-lg p-2 border-2 border-gray-300 rounded-md ${errorFlag ? "border-error" : ""}`, required: required }) }, key));
            case "dropdown":
                return (_jsx(Wrapper, { label: label, errorFlag: errorFlag, errorMsg: errorMsg, children: _jsx(Select, { onChange: onChange, value: value, className: `bg-slate-50 w-full ${errorFlag ? "border-error" : ""}`, required: required, children: config.options.map((option) => {
                            return (_jsx(Select.Option, { value: option, children: option }, option));
                        }) }) }, key));
            case "radio":
                return (_jsx(Wrapper, { label: label, errorFlag: errorFlag, errorMsg: errorMsg, children: config.options.map((option) => {
                        return (_jsxs("div", { children: [_jsx(Input, { type: "radio", value: option, onChange: onChange, checked: value.includes(option), required: required }), _jsx("label", { children: option })] }, option));
                    }) }, key));
        }
    };
    const getMultiElement = (config) => {
        const { key, label, configs, getAddButton, getRemoveButton, errorFlag, errorMsg, } = config;
        return (_jsxs("div", { className: "flex flex-col pt-2", children: [_jsxs("p", { children: [label, " ", errorFlag && _jsx("span", { className: "text-error", children: errorMsg })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [configs.map((subConfig, index) => {
                            return (_jsxs("div", { className: "flex flex-row gap-2 items-end", children: [getElement(subConfig), getRemoveButton(index)] }, index));
                        }), getAddButton()] })] }, key));
    };
    return (_jsx("div", { className: "min-w-64 flex flex-col gap-2", children: configs.map((config, indexA) => {
            if (Array.isArray(config)) {
                // recursively call FormFactory
                return (_jsx("div", { className: "flex flex-row gap-2", children: config.map((subConfig, indexB) => (_jsx(FormFactoryRecursive, { configs: [subConfig] }, `${indexA}-${indexB}`))) }, indexA));
            }
            if (config.type === "multi-input") {
                return getMultiElement(config);
            }
            else {
                return getElement(config);
            }
        }) }));
};
export const FormFactory = ({ configs, submit, }) => {
    // ref to the form
    const formRef = React.useRef(null);
    // Recursively check if errorFlag is true somewhere in the configs
    // Crazy performance, trust me bro
    const hasError = (configs) => {
        for (const config of configs) {
            if (Array.isArray(config)) {
                if (hasError(config)) {
                    return true;
                }
            }
            else {
                if (config.errorFlag) {
                    return true;
                }
            }
        }
        return false;
    };
    // Get if all fields with required are filled in the form
    // NOT IN THE CONFIGS, IN THE ACTUAL FORM
    const isFilled = () => {
        if (!formRef.current) {
            return false;
        }
        const inputs = formRef.current.querySelectorAll("input, select");
        for (const input of inputs) {
            if (input.required && !input.value) {
                return false;
            }
        }
        return true;
    };
    return (_jsxs(Form, { className: "form-control gap-2", onSubmit: (e) => {
            e.preventDefault();
            if (submit) {
                submit.onSubmit(e);
            }
        }, ref: formRef, children: [_jsx(FormFactoryRecursive, { configs: configs }), submit && (_jsx(_Fragment, { children: _jsx(Button, { color: "primary", className: "w-full btn mt-4", type: "submit", disabled: !isFilled() || hasError(configs), children: submit.text }) }))] }));
};
