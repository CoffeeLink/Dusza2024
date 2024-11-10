import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button, Table } from "react-daisyui";
import axios from "axios";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AXIOS_INSTANCE } from "../../../main.tsx";
export const Teams = () => {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        AXIOS_INSTANCE.get("/team/").then((res) => {
            setTeams(JSON.parse(res.data));
        });
    }, []);
    const onApprove = (id) => {
        axios.put(`/api/teams/${id}/approve`).then(() => {
            console.log("Approved team with id", id);
        });
    };
    const onReject = (id) => {
        axios.put(`/api/teams/${id}/reject`).then(() => {
            console.log("Rejected team with id", id);
        });
    };
    return (_jsx(MiddlePanel, { title: "Csapatok", children: _jsxs(Table, { children: [_jsxs(Table.Head, { children: [_jsx("span", { children: "Csapatn\u00E9v" }), _jsx("span", { children: "Felhaszn\u00E1l\u00F3n\u00E9v" }), _jsx("span", { children: "Kateg\u00F3ria" }), _jsx("span", { children: "Tagok" }), _jsx("span", { children: "Tan\u00E1rok" }), _jsx("span", { children: "Prog. nyelv" }), _jsx("span", { children: "Iskola" }), _jsx("span", { children: "J\u00F3v\u00E1hagy\u00E1s" })] }), _jsx(Table.Body, { children: teams.map((team) => (_jsxs(Table.Row, { children: [_jsx("span", { children: team.team_name }), _jsx("span", { children: team.user.username }), _jsx("span", { children: team.category.category_name }), _jsx("span", { children: team.members.map((member) => member.member_name).join(", ") }), _jsx("span", { children: team.sherpa_teachers
                                    .map((teacher) => teacher.teacher_name)
                                    .join(", ") }), _jsx("span", { children: team.lang.lang_name }), _jsx("span", { children: team.school.school_name }), _jsx("span", { children: team.team_approval_state === "Approved" ? (_jsx("span", { className: "text-green-700 font-bold", children: "J\u00F3v\u00E1hagyva" })) : (_jsx("span", { className: "text-red-700 font-bold", children: "Folyamatban" })) }), _jsx("span", { children: team.team_approval_state === "Approved" ? (_jsxs("span", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", color: "success", onClick: () => onApprove(team.team_id), children: _jsx(CheckCircleIcon, { className: "w-6" }) }), _jsx(Button, { size: "sm", color: "warning", onClick: () => onReject(team.team_id), children: _jsx(XCircleIcon, { className: "w-6" }) })] })) : (_jsx("span", { className: "text-red-700 font-bold", children: "Folyamatban" })) })] }, team.team_id))) })] }) }));
};
