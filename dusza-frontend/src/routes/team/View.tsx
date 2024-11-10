import { Team } from "../../helpers/models.ts";
import { useEffect, useState } from "react";
import { AXIOS_INSTANCE } from "../../main.tsx";
import { MiddlePanel } from "../../components/middle/MiddlePanel.tsx";

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
      team_approval_state: "pending",
    });
  }, []);

  if (!team) {
    return null;
  }

  return (
    <MiddlePanel title={"Csapat"}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-bold">Név</span>
            <span>{team.team_name}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Iskola</span>
            <span>{team.school.school_name}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Csapattagok</span>
            <span>{team.members.map((member) => member.name).join(", ")}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Póttag</span>
            <span>{team.replacement_member?.name || "Nincs"}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Kategória</span>
            <span>{team.category.category_name}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Nyelv</span>
            <span>{team.lang.lang_name}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Tanárok</span>
            <span>{team.sherpa_teachers.join(", ")}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Állapot</span>
            <span>{team.team_approval_state}</span>
          </div>
        </div>
      </div>
    </MiddlePanel>
  );
};
