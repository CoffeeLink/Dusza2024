import { useState } from "react";
import { Artboard, Button, Table } from "react-daisyui";
import axios from "axios";

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
    <div className="w-full flex flex-col gap-2">
      <h1 className="w-full text-center text-4xl">Teams</h1>

      <Artboard className="w-full bg-white p-2">
        <Table>
          <Table.Head>
            <span>Name</span>
            <span>Registered At</span>
            <span>Category</span>
            <span>Members</span>
            <span>Teachers</span>
            <span>Language</span>
            <span>School</span>
            <span>School Approval</span>
            <span>Host Approval</span>
            <span>Actions</span>
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
                <span>{team.schoolApproval ? "Approved" : "Pending"}</span>
                <span>{team.hostApproval ? "Approved" : "Pending"}</span>
                <span className="flex gap-2">
                  <Button color="success" onClick={() => onApprove(team.id)}>
                    Approve
                  </Button>
                  <Button color="warning" onClick={() => onReject(team.id)}>
                    Reject
                  </Button>
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Artboard>
    </div>
  );
};
