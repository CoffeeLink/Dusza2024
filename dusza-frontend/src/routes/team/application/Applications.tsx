import { Overview } from "../../../components/middle/Overview.tsx";
import { useEffect, useState } from "react";
import { Artboard, Button } from "react-daisyui";
import { Link } from "react-router-dom";

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
    <Overview title="Jelentkezések">
      {applications
        .map((application) => (
          <Overview.Card title={application.name} key={application.id}>
            <Artboard>
              <p>Kategória: {application.category}</p>
              <p>Nyelv: {application.language}</p>
              <p>Regisztrált: {application.registeredAt.toDateString()}</p>
              <p>Állapot (iskola): {application.state_school}</p>
              <p>Állapot (szervező): {application.state_host}</p>
              <Link to={`/team/applications/${application.id}`}>
                <Button color="primary">Szerkesztés</Button>
              </Link>
            </Artboard>
          </Overview.Card>
        ))
        .concat(
          <Overview.Card title="Új jelentkezés" key="new">
            <Link to="/team/applications/add">
              <Button className="text-white bg-green-700 hover:bg-green-600 active:bg-green-800">
                Új jelentkezés
              </Button>
            </Link>
          </Overview.Card>,
        )}
    </Overview>
  );
};
