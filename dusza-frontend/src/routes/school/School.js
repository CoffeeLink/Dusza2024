import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button, Table } from "react-daisyui";
import { MiddlePanel } from "../../components/middle/MiddlePanel.tsx";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AXIOS_INSTANCE } from "../../main.tsx";
export const School = () => {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        // axios.get("/api/teams").then((res) => {
        //   setTeams(res.data);
        // });
        AXIOS_INSTANCE.get("/team/").then((res) => {
            setTeams(JSON.parse(res.data));
        });
    }, []);
    return (
    // <div className="w-full flex flex-row gap-4 justify-center">
    //   <div className="max-w-5xl w-full">
    //     <MiddlePanel title={"Jelentkezések"}>
    //       <Table>
    //         <Table.Head>
    //           <span>Csapatnév</span>
    //           <span>Kategória</span>
    //           <span>Nyelv</span>
    //           <span>Csapattagok</span>
    //           <span>Regisztrált</span>
    //           <span>Jóváhagyás (iskola)</span>
    //           <span>Jóváhagyás (szervező)</span>
    //           {/* <span>Műveletek</span> */}
    //         </Table.Head>
    //         <Table.Body>
    //           {applications.map((application, index) => (
    //             <Table.Row key={index}>
    //               <span>{application.name}</span>
    //               <span>{application.category}</span>
    //               <span>{application.language}</span>
    //               <span>CSAPATTAGOK</span>
    //               <span>{application.registeredAt.toDateString()}</span>
    //
    //               <span>
    //                 {application.state_school === "pending" ? (
    //                   <span className="flex gap-2">
    //                     <Button
    //                       size="sm"
    //                       color="success"
    //                       onClick={() => onAccept(application)}
    //                     >
    //                       <CheckCircleIcon className="w-6" />
    //                     </Button>
    //                     <Button
    //                       size="sm"
    //                       color="error"
    //                       onClick={() => onReject(application)}
    //                     >
    //                       <XCircleIcon className="w-6" />
    //                     </Button>
    //                   </span>
    //                 ) : (
    //                   <span className="text-green-700 font-bold">
    //                     Jóváhagyva
    //                   </span>
    //                 )}
    //               </span>
    //               <span>
    //                 {application.state_host === "pending" ? (
    //                   <span>Folyamatban</span>
    //                 ) : (
    //                   <span className="text-green-700 font-bold">
    //                     Jóváhagyva
    //                   </span>
    //                 )}
    //               </span>
    //             </Table.Row>
    //           ))}
    //         </Table.Body>
    //       </Table>
    //     </MiddlePanel>
    //   </div>
    // </div>
    _jsx("div", { className: "w-full flex flex-row gap-4 justify-center", children: _jsx("div", { className: "max-w-5xl w-full", children: _jsx(MiddlePanel, { title: "Csapatok", children: _jsxs(Table, { children: [_jsxs(Table.Head, { children: [_jsx("span", { children: "Csapatn\u00E9v" }), _jsx("span", { children: "Felhaszn\u00E1l\u00F3n\u00E9v" }), _jsx("span", { children: "Kateg\u00F3ria" }), _jsx("span", { children: "Tagok" }), _jsx("span", { children: "Tan\u00E1rok" }), _jsx("span", { children: "Prog. nyelv" }), _jsx("span", { children: "Iskola" }), _jsx("span", { children: "Szervez\u0151i j\u00F3v\u00E1hagy\u00E1s" })] }), _jsx(Table.Body, { children: teams.map((team) => (_jsxs(Table.Row, { children: [_jsx("span", { children: team.team_name }), _jsx("span", { children: team.user.username }), _jsx("span", { children: team.category.category_name }), _jsx("span", { children: team.members
                                            .map((member) => member.member_name)
                                            .join(", ") }), _jsx("span", { children: team.sherpa_teachers
                                            .map((teacher) => teacher.teacher_name)
                                            .join(", ") }), _jsx("span", { children: team.lang.lang_name }), _jsx("span", { children: team.school.school_name }), _jsx("span", { children: team.team_approval_state === "ApprovedBySchoolRep" ? (_jsxs("span", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", color: "success", children: _jsx(CheckCircleIcon, { className: "w-6" }) }), _jsx(Button, { size: "sm", color: "warning", children: _jsx(XCircleIcon, { className: "w-6" }) })] })) : (_jsx("span", { className: "text-red-700 font-bold", children: "Folyamatban" })) })] }, team.team_id))) })] }) }) }) }));
};
