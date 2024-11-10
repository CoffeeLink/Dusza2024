import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { Link } from "react-router-dom";
import { Button, Table } from "react-daisyui";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
export const Languages = () => {
    const [languages, setLanguages] = useState([]);
    useEffect(() => {
        AXIOS_INSTANCE.get("/language/").then((response) => {
            const data = JSON.parse(response.data);
            setLanguages(data);
        });
    }, []);
    const onDelete = (id) => {
        AXIOS_INSTANCE.delete(`/language/${id}`).then(() => {
            setLanguages((prev) => prev.filter((language) => language.lang_id !== id));
            console.log("Deleted language with id", id);
        });
    };
    return (_jsx(MiddlePanel, { title: "Programoz\u00E1si nyelvek", rightButton: _jsx(Link, { to: "/host/languages/add", children: _jsxs(Button, { className: "text-white bg-green-700 hover:bg-green-600 active:bg-green-800", children: [_jsx(CodeBracketIcon, { className: "w-5" }), " \u00DAj programoz\u00E1si nyelv"] }) }), children: _jsxs(Table, { children: [_jsxs(Table.Head, { children: [_jsx("span", { children: "N\u00E9v" }), _jsx("span", { children: "M\u0171veletek" })] }), _jsx(Table.Body, { children: languages.map((language) => (_jsxs(Table.Row, { children: [_jsx("span", { children: language.lang_name }), _jsxs("span", { className: "flex gap-2", children: [_jsx(Link, { to: `/host/languages/${language.lang_id}`, children: _jsx(Button, { children: "Szerkeszt\u00E9s" }) }), _jsx(Button, { color: "error", onClick: () => onDelete(language.lang_id), children: "T\u00F6rl\u00E9s" })] })] }, language.lang_id))) })] }) }));
};
