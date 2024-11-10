import { Team } from "../../helpers/models.ts";
import { useEffect, useState } from "react";
import { AXIOS_INSTANCE } from "../../main.tsx";
import { MiddlePanel } from "../../components/middle/MiddlePanel.tsx";
import { Table } from "react-daisyui";

export const View = () => {
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    // AXIOS_INSTANCE.get("/team/").then((res) => {
    //   setTeam(JSON.parse(res.data));
    // });

    setTeam({
      team_id: 1,
      team_name: "Csapat 1",
      school: {
        school_id: 1,
        school_name: "Iskola 1",
      },
      members: [
        {
          member_id: 1,
          name: "Tag 1",
        },
        {
          member_id: 2,
          name: "Tag 2",
        },
      ],
      replacement_member: {
        member_id: 3,
        name: "Póttag 1",
      },
      category: {
        category_id: 1,
        category_name: "Kategória 1",
      },
      lang: {
        lang_id: 1,
        lang_name: "Nyelv 1",
      },
      sherpa_teachers: ["Tanár 1", "Tanár 2"],
      team_approval_state: "Approved",
    });
  }, []);

  if (!team) {
    return null;
  }

  return (
    <MiddlePanel title={"Csapat"}>
      <Table>
        <Table.Head>
          
            <span>Csapatnév</span>
            <span>Iskola</span>
            <span>Csapattagok</span>
            <span>Póttag</span>
            <span>Kategória</span>
            <span>Nyelv</span>
            <span>Tanárok</span>
            <span>Állapot</span>
          
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <span>{team.team_name}</span>
            <span>{team.school.school_name}</span>
            <span>{team.members.map((member) => member.name).join(", ")}</span>
            <span>{team.replacement_member?.name || "Nincs"}</span>
            <span>{team.category.category_name}</span>
            <span>{team.lang.lang_name}</span>
            <span>{team.sherpa_teachers.join(", ")}</span>
            <span>{team.team_approval_state === "Approved" ? <span className="text-green-700 font-bold">Jóváhagyva</span> : "Folyamatban van"}</span>
          </Table.Row>
        </Table.Body>
      </Table>

    </MiddlePanel>
  );
};
