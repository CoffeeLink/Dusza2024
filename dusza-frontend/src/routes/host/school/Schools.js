import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Table } from "react-daisyui";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { AXIOS_INSTANCE } from "../../../main.tsx";
export const Schools = () => {
    const [schools, setSchools] = useState([]);
    useEffect(() => {
        AXIOS_INSTANCE.get("/school/").then((res) => {
            const data = JSON.parse(res.data);
            setSchools(data);
        });
    }, []);
    const onDelete = (id) => {
        AXIOS_INSTANCE.delete(`/school/${id}`).then(() => {
            setSchools(schools.filter((school) => school.school_id !== id));
            console.log("Deleted school with id", id);
        });
    };
    return (_jsx(MiddlePanel, { title: "Iskol\u00E1k", rightButton: _jsx(Link, { to: "/host/schools/add", children: _jsxs(Button, { className: "text-white bg-green-700 hover:bg-green-600 active:bg-green-800", children: [_jsx(AcademicCapIcon, { className: "w-5" }), " \u00DAj iskola"] }) }), children: _jsxs(Table, { children: [_jsxs(Table.Head, { children: [_jsx("span", { children: "N\u00E9v" }), _jsx("span", { children: "Lok\u00E1ci\u00F3" }), _jsx("span", { children: "Felhaszn\u00E1l\u00F3n\u00E9v" }), _jsx("span", { children: "Kapcsolattart\u00F3" }), _jsx("span", { children: "Kapcsolattart\u00F3 email" }), _jsx("span", { children: "M\u0171veletek" })] }), _jsx(Table.Body, { children: schools.map((school) => (_jsxs(Table.Row, { children: [_jsx("span", { children: school.school_name }), _jsx("span", { children: school.school_address }), _jsx("span", { children: school.user.username }), _jsx("span", { children: school.school_rep_name }), _jsx("span", { children: school.school_rep_email }), _jsxs("span", { className: "flex gap-2", children: [_jsx(Link, { to: `/host/schools/${school.school_id}`, children: _jsx(Button, { children: "Szerkeszt\u00E9s" }) }), _jsx(Button, { color: "error", onClick: () => onDelete(school.school_id), children: "T\u00F6rl\u00E9s" })] })] }, school.school_id))) })] }) }));
};
