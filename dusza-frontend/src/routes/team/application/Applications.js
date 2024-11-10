import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button, Table } from "react-daisyui";
import { Link } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { DocumentPlusIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
export const Applications = () => {
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        // Fetch applications
        // axios.get("/api/applications").then((response) => {
        //   // Set applications
        // }
        setApplications([
            {
                id: 1,
                name: "Team 1",
                category: "Category 1",
                language: "Language 1",
                registeredAt: new Date(),
                state_school: "pending",
                state_host: "rejected",
            },
            {
                id: 2,
                name: "Team 2",
                category: "Category 2",
                language: "Language 2",
                registeredAt: new Date(),
                state_school: "pending",
                state_host: "rejected",
            },
        ]);
    }, []);
    return (_jsx(MiddlePanel, { title: "Jelentkezések", rightButton: _jsx(Link, { to: "/team/applications/add", children: _jsxs(Button, { className: "text-white bg-green-700 hover:bg-green-600 active:bg-green-800", children: [_jsx(DocumentPlusIcon, { className: "w-5" }), " \u00DAj jelentkez\u00E9s"] }) }), children: _jsxs(Table, { children: [_jsxs(Table.Head, { children: [_jsx("span", { children: "N\u00E9v" }), _jsx("span", { children: "Kateg\u00F3ria" }), _jsx("span", { children: "Nyelv" }), _jsx("span", { children: "Regisztr\u00E1lt" }), _jsx("span", { children: "\u00C1llapot (iskola)" }), _jsx("span", { children: "\u00C1llapot (szervez\u0151)" }), _jsx("span", { children: "M\u0171veletek" })] }), _jsx(Table.Body, { children: applications.map((application) => (_jsxs(Table.Row, { children: [_jsx("span", { children: application.name }), _jsx("span", { children: application.category }), _jsx("span", { children: application.language }), _jsx("span", { children: application.registeredAt.toDateString() }), _jsx("span", { children: application.state_school }), _jsx("span", { children: application.state_host }), _jsx("span", { className: "flex flex-row gap-2", children: _jsx(Link, { to: `/team/applications/${application.id}`, children: _jsxs(Button, { color: "primary", children: [_jsx(PencilSquareIcon, { className: "w-5" }), "Szerkeszt\u00E9s"] }) }) })] }, application.id))) })] }) }));
};
