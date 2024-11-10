import { useState } from "react";
import { Button, Table } from "react-daisyui";
import axios from "axios";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

type Team = {
  id: number;
  name: string;
  registeredAt: Date;
  category: string;
  members: string[];
  teachers: string[];
  language: string;
  school: string;
  schoolApproval: boolean;
  hostApproval: boolean;
};

export const Teams = () => {
  const [teams] = useState<Team[]>([
    {
      id: 1,
      name: "Team 1",
      registeredAt: new Date(),
      category: "Category 1",
      members: ["Member 1", "Member 2"],
      teachers: ["Teacher 1", "Teacher 2"],
      language: "Language",
      school: "School",
      schoolApproval: true,
      hostApproval: true,
    },
    {
      id: 2,
      name: "Team 2",
      registeredAt: new Date(),
      category: "Category 2",
      members: ["Member 1", "Member 2"],
      teachers: ["Teacher 1", "Teacher 2"],
      language: "Language",
      school: "School",
      schoolApproval: true,
      hostApproval: true,
    },
  ]);

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
          <span>Rögzítve</span>
          <span>Kategória</span>
          <span>Tagok</span>
          <span>Tanárok</span>
          <span>Prog. nyelv</span>
          <span>Iskola</span>
          <span>Igazgatói jóváhagyás</span>
          <span>Szervezői jóváhagyás</span>
          <span>Műveletek</span>
        </Table.Head>
        <Table.Body>
          {teams.map((team) => (
            <Table.Row key={team.id}>
              <span>{team.name}</span>
              <span>{team.registeredAt.toDateString()}</span>
              <span>{team.category}</span>
              <span>{team.members.join(", ")}</span>
              <span>{team.teachers.join(", ")}</span>
              <span>{team.language}</span>
              <span>{team.school}</span>
              <span>{team.schoolApproval ? "Folyamatban" : "Jóváhagyva"}</span>
              <span>{team.hostApproval ? "Folyamatban" : "Jóváhagyva"}</span>
              <span className="flex gap-2">
                <Button size="sm" color="success" onClick={() => onApprove(team.id)}>
                  <CheckCircleIcon className="w-6"/>
                </Button>
                <Button size="sm" color="warning" onClick={() => onReject(team.id)}>
                  <XCircleIcon className="w-6"/>
                </Button>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </MiddlePanel>
  );
};
