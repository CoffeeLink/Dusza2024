import { useEffect, useState } from "react";
import { Button, Table } from "react-daisyui";
import { Link } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";

type Application = {
  id: number;
  name: string;
  category: string;
  language: string;
  registeredAt: Date;
  state_school: "pending" | "accepted" | "rejected";
  state_host: "pending" | "accepted" | "rejected";
};

export const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // Fetch applications
    // axios.get("/api/applications").then((response) => {
    //   // Set applications
    // }

    setApplications([
      {
        id: 1,
        name: "Team 1",
        category: "Category 1",
        language: "Language 1",
        registeredAt: new Date(),
        state_school: "pending",
        state_host: "rejected",
      },
      {
        id: 2,
        name: "Team 2",
        category: "Category 2",
        language: "Language 2",
        registeredAt: new Date(),
        state_school: "pending",
        state_host: "rejected",
      },
    ]);
  }, []);

  return (
    <MiddlePanel
      title={"Jelentkezések"}
      rightButton={
        <Link to="/team/applications/add">
          <Button color="success">Új jelentkezés</Button>
        </Link>
      }
    >
      {/*  Add a table  */}
      <Table>
        <Table.Head>
          <span>Név</span>
          <span>Kategória</span>
          <span>Nyelv</span>
          <span>Regisztrált</span>
          <span>Állapot (iskola)</span>
          <span>Állapot (szervező)</span>
          <span>Műveletek</span>
        </Table.Head>
        <Table.Body>
          {applications.map((application) => (
            <Table.Row key={application.id}>
              <span>{application.name}</span>
              <span>{application.category}</span>
              <span>{application.language}</span>
              <span>{application.registeredAt.toDateString()}</span>
              <span>{application.state_school}</span>
              <span>{application.state_host}</span>
              <span className="flex flex-row gap-2">
                <Link to={`/team/applications/${application.id}`}>
                  <Button color="primary">Szerkesztés</Button>
                </Link>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </MiddlePanel>
  );
};
