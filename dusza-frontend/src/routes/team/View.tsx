// import { Team } from "../../helpers/models.ts";
// import { useEffect, useState } from "react";
// import { AXIOS_INSTANCE } from "../../main.tsx";
// import { MiddlePanel } from "../../components/middle/MiddlePanel.tsx";
// import { Table } from "react-daisyui";
//
// export const View = () => {
//   const [team, setTeam] = useState<Team | null>(null);
//
//   useEffect(() => {
//     // AXIOS_INSTANCE.get("/team/").then((res) => {
//     //   setTeam(JSON.parse(res.data));
//     // });
//
//     setTeam({
//       team_id: 1,
//       team_name: "Csapat 1",
//       school: {
//         school_id: 1,
//         school_name: "Iskola 1",
//       },
//       members: [
//         {
//           member_id: 1,
//           member_name: "Tag 1",
//         },
//         {
//           member_id: 2,
//           member_name: "Tag 2",
//         },
//       ],
//       replacement_member: {
//         member_id: 3,
//         member_name: "Póttag 1",
//       },
//       category: {
//         category_id: 1,
//         category_name: "Kategória 1",
//       },
//       lang: {
//         lang_id: 1,
//         lang_name: "Nyelv 1",
//       },
//       sherpa_teachers: ["Tanár 1", "Tanár 2"],
//       team_approval_state: "Approved",
//     });
//   }, []);
//
//   if (!team) {
//     return null;
//   }
//
//   return (
//     <MiddlePanel title={"Csapat"}>
//       {/*<Table>*/}
//       {/*  <Table.Head>*/}
//       {/*    */}
//       {/*      <span>Csapatnév</span>*/}
//       {/*      <span>Iskola</span>*/}
//       {/*      <span>Csapattagok</span>*/}
//       {/*      <span>Póttag</span>*/}
//       {/*      <span>Kategória</span>*/}
//       {/*      <span>Nyelv</span>*/}
//       {/*      <span>Tanárok</span>*/}
//       {/*      <span>Állapot</span>*/}
//       {/*    */}
//       {/*  </Table.Head>*/}
//       {/*  <Table.Body>*/}
//       {/*    <Table.Row>*/}
//       {/*      <span>{team.team_name}</span>*/}
//       {/*      <span>{team.school.school_name}</span>*/}
//       {/*    </div>*/}
//       {/*    <div className="flex flex-col gap-2">*/}
//       {/*      <span className="font-bold">Csapattagok</span>*/}
//       {/*      <span>*/}
//       {/*        {team.members.map((member) => member.member_name).join(", ")}*/}
//       {/*      </span>*/}
//       {/*    </div>*/}
//       {/*    <div className="flex flex-col gap-2">*/}
//       {/*      <span className="font-bold">Póttag</span>*/}
//       {/*      <span>{team.replacement_member?.member_name || "Nincs"}</span>*/}
//       {/*    </div>*/}
//       {/*    <div className="flex flex-col gap-2">*/}
//       {/*      <span className="font-bold">Kategória</span>*/}
//       {/*      <span>{team.category.category_name}</span>*/}
//       {/*      <span>{team.lang.lang_name}</span>*/}
//       {/*      <span>{team.sherpa_teachers.join(", ")}</span>*/}
//       {/*      <span>{team.team_approval_state === "Approved" ? <span className="text-green-700 font-bold">Jóváhagyva</span> : "Folyamatban van"}</span>*/}
//       {/*    </Table.Row>*/}
//       {/*  </Table.Body>*/}
//       {/*</Table>*/}
//
//   );
// };
import { Team, TeamWithId, UserWithId } from "../../helpers/models.ts";
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
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    // user/self

    AXIOS_INSTANCE.get("/user/self").then((res) => {
      // Get all teams
      AXIOS_INSTANCE.get("/team/").then((res2) => {
        // Find the team
        const me = JSON.parse(res.data) as UserWithId;
        const teams = JSON.parse(res2.data) as TeamWithId[];
        const myTeam = teams.find((team) => team.user.user_id === me.user_id)!;
        setTeam(myTeam);
      });
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
          <span>Jóváhagyás</span>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <span>{team.team_name}</span>
            <span>{team.school.school_name}</span>
            <span>
              {team.members.map((member) => member.member_name).join(", ")}
            </span>
            <span>{team.replacement_member?.member_name || "Nincs"}</span>
            <span>{team.category.category_name}</span>
            <span>{team.lang.lang_name}</span>
            <span>
              {team.sherpa_teachers
                .map((teacher) => teacher.teacher_name)
                .join(", ")}
            </span>
            <span>
              {team.team_approval_state === "Approved" ? (
                <span className="text-green-700 font-bold">Jóváhagyva</span>
              ) : (
                "Folyamatban van"
              )}
            </span>
          </Table.Row>
        </Table.Body>
      </Table>
    </MiddlePanel>
  );
};
