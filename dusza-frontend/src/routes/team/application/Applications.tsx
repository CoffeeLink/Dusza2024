import { Overview } from "../../../components/middle/Overview.tsx";
import { useEffect, useState } from "react";
import { Button } from "react-daisyui";

type Application = {
  id: number;
  name: string;
  category: string;
  language: string;
  registeredAt: Date;
  state: "pending" | "accepted" | "rejected";
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
        state: "pending",
      },
      {
        id: 2,
        name: "Team 2",
        category: "Category 2",
        language: "Language 2",
        registeredAt: new Date(),
        state: "accepted",
      },
    ]);
  }, []);

  return (
    <Overview title="Jelentkezések">
      {applications.map((application) => (
        <Overview.Card title={application.name} key={application.id}>
          <p>Kategória: {application.category}</p>
          <p>Nyelv: {application.language}</p>
          <p>
            Jelentkezés ideje: {application.registeredAt.toLocaleDateString()}
          </p>
          <p>Állapot: {application.state}</p>
          <Button>Edit</Button>
        </Overview.Card>
      ))}
    </Overview>
  );
};
