import { useEffect, useState } from "react";
import { Button, Table } from "react-daisyui";
import axios from "axios";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { TeamWithId } from "../../../helpers/models.ts";
import { AXIOS_INSTANCE } from "../../../main.tsx";

export const Teams = () => {
  const [teams, setTeams] = useState<TeamWithId[]>([]);

  useEffect(() => {
    AXIOS_INSTANCE.get("/team/").then((res) => {
      setTeams(JSON.parse(res.data));
    });
  }, []);

  const onApprove = (id: number) => {
    axios.put(`/api/teams/${id}/approve`).then(() => {
      console.log("Approved team with id", id);
    });
  };

  const onReject = (id: number) => {
    axios.put(`/api/teams/${id}/reject`).then(() => {
      console.log("Rejected team with id", id);
    });
  };

  return (
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
          <span>Jóváhagyás</span>
        </Table.Head>
        <Table.Body>
          {teams.map((team) => (
            <Table.Row key={team.team_id}>
              <span>{team.team_name}</span>
              <span>{team.user.username}</span>
              <span>{team.category.category_name}</span>
              <span>
                {team.members.map((member) => member.member_name).join(", ")}
              </span>
              <span>
                {team.sherpa_teachers
                  .map((teacher) => teacher.teacher_name)
                  .join(", ")}
              </span>
              <span>{team.lang.lang_name}</span>
              <span>{team.school.school_name}</span>
              <span>
                {team.team_approval_state === "Approved" ? (
                  <span className="text-green-700 font-bold">Jóváhagyva</span>
                ) : (
                  <span className="text-red-700 font-bold">Folyamatban</span>
                )}
              </span>
              {/*<span>{team.hostApproval ? <span className="flex gap-2">*/}
              {/*  <Button size="sm" color="success" onClick={() => onApprove(team.id)}>*/}
              {/*    <CheckCircleIcon className="w-6"/>*/}
              {/*  </Button>*/}
              {/*  <Button size="sm" color="warning" onClick={() => onReject(team.id)}>*/}
              {/*    <XCircleIcon className="w-6"/>*/}
              {/*  </Button>*/}
              {/*</span> : <span className="text-green-700 font-bold">Jóváhagyva</span>}</span>*/}

              <span>
                {team.team_approval_state === "Approved" ? (
                  <span className="flex gap-2">
                    <Button
                      size="sm"
                      color="success"
                      onClick={() => onApprove(team.team_id)}
                    >
                      <CheckCircleIcon className="w-6" />
                    </Button>
                    <Button
                      size="sm"
                      color="warning"
                      onClick={() => onReject(team.team_id)}
                    >
                      <XCircleIcon className="w-6" />
                    </Button>
                  </span>
                ) : (
                  <span className="text-red-700 font-bold">Folyamatban</span>
                )}
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </MiddlePanel>
  );
};
