import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AXIOS_INSTANCE } from "../../main.tsx";
import { MiddlePanel } from "../../components/middle/MiddlePanel.tsx";
import { Table } from "react-daisyui";
{
    /*  <Table>*/
}
{
    /*    <Table.Head>*/
}
{
    /*      <span>Csapatnév</span>*/
}
{
    /*      <span>Iskola</span>*/
}
{
    /*      <span>Csapattagok</span>*/
}
{
    /*      <span>Póttag</span>*/
}
{
    /*      <span>Kategória</span>*/
}
{
    /*      <span>Nyelv</span>*/
}
{
    /*      <span>Tanárok</span>*/
}
{
    /*      <span>Állapot</span>*/
}
{
    /*    </Table.Head>*/
}
{
    /*    <Table.Body>*/
}
{
    /*      <Table.Row>*/
}
{
    /*        <span>{team.team_name}</span>*/
}
{
    /*        <span>{team.school.school_name}</span>*/
}
{
    /*        <span>*/
}
{
    /*          {team.members.map((member) => member.member_name).join(", ")}*/
}
{
    /*        </span>*/
}
{
    /*        <span>{team.replacement_member?.member_name || "Nincs"}</span>*/
}
{
    /*        <span>{team.category.category_name}</span>*/
}
{
    /*        <span>{team.lang.lang_name}</span>*/
}
{
    /*        <span>{team.sherpa_teachers.join(", ")}</span>*/
}
{
    /*        <span>*/
}
{
    /*          {team.team_approval_state === "Approved" ? (*/
}
{
    /*            <span className="text-green-700 font-bold">Jóváhagyva</span>*/
}
{
    /*          ) : (*/
}
{
    /*            "Folyamatban van"*/
}
{
    /*          )}*/
}
{
    /*        </span>*/
}
{
    /*      </Table.Row>*/
}
{
    /*    </Table.Body>*/
}
{
    /*  </Table>*/
}
{
    /*</MiddlePanel>*/
}
export const View = () => {
    const [team, setTeam] = useState(null);
    useEffect(() => {
        // user/self
        AXIOS_INSTANCE.get("/user/self").then((res) => {
            // Get all teams
            AXIOS_INSTANCE.get("/team/").then((res2) => {
                // Find the team
                const me = JSON.parse(res.data);
                const teams = JSON.parse(res2.data);
                const myTeam = teams.find((team) => team.user.user_id === me.user_id);
                setTeam(myTeam);
            });
        });
    }, []);
    if (!team) {
        return null;
    }
    return (_jsx(MiddlePanel, { title: "Csapat", children: _jsxs(Table, { children: [_jsxs(Table.Head, { children: [_jsx("span", { children: "Csapatn\u00E9v" }), _jsx("span", { children: "Iskola" }), _jsx("span", { children: "Csapattagok" }), _jsx("span", { children: "P\u00F3ttag" }), _jsx("span", { children: "Kateg\u00F3ria" }), _jsx("span", { children: "Nyelv" }), _jsx("span", { children: "Tan\u00E1rok" }), _jsx("span", { children: "J\u00F3v\u00E1hagy\u00E1s" })] }), _jsx(Table.Body, { children: _jsxs(Table.Row, { children: [_jsx("span", { children: team.team_name }), _jsx("span", { children: team.school.school_name }), _jsx("span", { children: team.members.map((member) => member.member_name).join(", ") }), _jsx("span", { children: team.replacement_member?.member_name || "Nincs" }), _jsx("span", { children: team.category.category_name }), _jsx("span", { children: team.lang.lang_name }), _jsx("span", { children: team.sherpa_teachers
                                    .map((teacher) => teacher.teacher_name)
                                    .join(", ") }), _jsx("span", { children: team.team_approval_state === "Approved" ? (_jsx("span", { className: "text-green-700 font-bold", children: "J\u00F3v\u00E1hagyva" })) : ("Folyamatban van") })] }) })] }) }));
};
