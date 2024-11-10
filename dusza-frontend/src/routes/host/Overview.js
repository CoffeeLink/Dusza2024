import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "react-daisyui";
import { Link } from "react-router-dom";
import { Overview as AbstractOverview } from "../../components/middle/Overview.tsx";
import { countDown } from "../../helpers/time.ts";
export const Overview = () => {
    const [categories] = useState([
        {
            name: "Category 1",
            deadline: new Date("2024-12-10"),
            teamCount: 0,
        },
        {
            name: "Category 2",
            deadline: new Date("2024-11-10"),
            teamCount: 0,
        },
        {
            name: "Category 3",
            deadline: new Date("2024-11-8"),
            teamCount: 0,
        },
    ]);
    const [teams] = useState([
        {
            name: "Team 1",
            registeredAt: new Date("2024-10-10"),
            category: "Category 1",
        },
        {
            name: "Team 2",
            registeredAt: new Date("2024-10-10"),
            category: "Category 2",
        },
        {
            name: "Team 3",
            registeredAt: new Date("2024-10-10"),
            category: "Category 3",
        },
    ]);
    const [pendingTeams] = useState([
        {
            name: "Team 4",
            registeredAt: new Date("2024-10-10"),
            category: "Category 1",
        },
        {
            name: "Team 5",
            registeredAt: new Date("2024-10-10"),
            category: "Category 2",
        },
        {
            name: "Team 6",
            registeredAt: new Date("2024-10-10"),
            category: "Category 3",
        },
    ]);
    return (_jsxs(AbstractOverview, { title: "\u00C1ttekint\u00E9s", children: [_jsxs(AbstractOverview.Card, { title: "Kateg\u00F3ri\u00E1k", children: [categories.map((category, index) => (_jsxs(AbstractOverview.Card, { title: category.name, className: "bg-blue-200", children: [_jsxs("p", { children: ["H\u00E1tral\u00E9v\u0151 id\u0151: ", countDown(category.deadline)] }), _jsxs("p", { children: ["Regisztr\u00E1lt csapatok: ", category.teamCount] })] }, index))), _jsx(Link, { to: "/host/teams", className: "w-full", children: _jsx(Button, { color: "primary", className: "w-full", children: "\u00D6sszes kateg\u00F3ria" }) })] }), _jsxs(AbstractOverview.Card, { title: "Regisztr\u00E1lt csapatok", children: [teams.map((team, index) => (_jsxs(AbstractOverview.Card, { title: team.name, className: "bg-blue-200", children: [_jsxs("p", { children: ["R\u00F6gz\u00EDtve: ", team.registeredAt.toDateString()] }), _jsxs("p", { children: ["Kateg\u00F3ria: ", team.category] })] }, index))), _jsx(Link, { to: "/host/teams", className: "w-full", children: _jsx(Button, { color: "primary", className: "w-full", children: "All teams" }) })] }), _jsxs(AbstractOverview.Card, { title: "Nem j\u00F3v\u00E1hagyott csapatok", children: [pendingTeams.map((team, index) => (_jsxs(AbstractOverview.Card, { title: team.name, className: "bg-blue-200", children: [_jsxs("p", { children: ["R\u00F6gz\u00EDtve: ", team.registeredAt.toDateString()] }), _jsxs("p", { children: ["Kateg\u00F3ria: ", team.category] })] }, index))), _jsx(Link, { to: "/host/teams", className: "w-full", children: _jsx(Button, { color: "primary", className: "w-full", children: "\u00D6sszes nem j\u00F3v\u00E1hagyott csapat" }) })] })] }));
};
