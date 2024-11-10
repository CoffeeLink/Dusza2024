import { useEffect, useState } from "react";
import { Button, Table } from "react-daisyui";
import { MiddlePanel } from "../../components/middle/MiddlePanel.tsx";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { TeamWithId } from "../../helpers/models.ts";
import { AXIOS_INSTANCE } from "../../main.tsx";

export const School = () => {
  const [teams, setTeams] = useState<TeamWithId[]>([]);

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

    <div className="w-full flex flex-row gap-4 justify-center">
      <div className="max-w-5xl w-full">
        <MiddlePanel title="Csapatok">
          <Table>
            <Table.Head>
              <span>Csapatnév</span>
              <span>Felhasználónév</span>
              <span>Kategória</span>
              <span>Tagok</span>
              <span>Tanárok</span>
              <span>Prog. nyelv</span>
              <span>Iskola</span>
              <span>Szervezői jóváhagyás</span>
            </Table.Head>
            <Table.Body>
              {teams.map((team) => (
                <Table.Row key={team.team_id}>
                  <span>{team.team_name}</span>
                  <span>{team.user.username}</span>
                  <span>{team.category.category_name}</span>
                  <span>
                    {team.members
                      .map((member) => member.member_name)
                      .join(", ")}
                  </span>
                  <span>
                    {team.sherpa_teachers
                      .map((teacher) => teacher.teacher_name)
                      .join(", ")}
                  </span>
                  <span>{team.lang.lang_name}</span>
                  <span>{team.school.school_name}</span>
                  <span>
                    {team.team_approval_state === "ApprovedBySchoolRep" ? (
                      <span className="flex gap-2">
                        <Button
                          size="sm"
                          color="success"
                          //onClick={() => onApprove(team.team_id)}
                        >
                          <CheckCircleIcon className="w-6" />
                        </Button>
                        <Button
                          size="sm"
                          color="warning"
                          //onClick={() => onReject(team.team_id)}
                        >
                          <XCircleIcon className="w-6" />
                        </Button>
                      </span>
                    ) : (
                      <span className="text-red-700 font-bold">
                        Folyamatban
                      </span>
                    )}
                  </span>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </MiddlePanel>
      </div>
    </div>
  );
};
