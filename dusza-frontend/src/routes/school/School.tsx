import { useEffect, useState } from "react";
import { Button, Table } from "react-daisyui";
import { MiddlePanel } from "../../components/middle/MiddlePanel.tsx";

type Application = {
  name: string;
  category: string;
  language: string;
  school: string;
  registeredAt: Date;
  state_school: "pending" | "accepted" | "rejected";
  state_host: "pending" | "accepted" | "rejected";
};

export const School = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [schools, setSchools] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch applications
    // axios.get("/api/applications").then((response) => {
    //   // Set applications
    // }

    setApplications([
      {
        name: "Application 1",
        category: "Category 1",
        language: "Language 1",
        school: "School 1",
        registeredAt: new Date(),
        state_school: "pending",
        state_host: "pending",
      },
      {
        name: "Application 2",
        category: "Category 2",
        language: "Language 2",
        school: "School 2",
        registeredAt: new Date(),
        state_school: "pending",
        state_host: "pending",
      },
    ]);
  }, []);

  useEffect(() => {
    // Fetch categories
    // axios.get("/api/categories/available").then((response) => {
    //   // Set categories
    // }

    setCategories(["Category 1", "Category 2", "Category 3"]);
  }, []);

  useEffect(() => {
    // Fetch schools
    // axios.get("/api/schools/available").then((response) => {
    //   // Set schools
    // }

    setSchools(["School 1", "School 2", "School 3"]);
  }, []);

  useEffect(() => {
    // Fetch languages
    // axios.get("/api/languages/available").then((response) => {
    //   // Set languages
    // }

    setLanguages(["Language 1", "Language 2", "Language 3"]);
  }, []);

  const onAccept = (application: Application) => {
    // axios.put(`/api/applications/${application.id}/accept`).then((response) => {
    //   // Update applications
    // }
  };

  const onReject = (application: Application) => {
    // axios.put(`/api/applications/${application.id}/reject`).then((response) => {
    //   // Update applications
    // }
  };

  return (
    <div className="w-full flex flex-row gap-4 justify-center">
      <div className="max-w-5xl w-full">
        <MiddlePanel title={"Jelentkezések"}>
          <Table>
            <Table.Head>
              <span>Név</span>
              <span>Kategória</span>
              <span>Nyelv</span>
              <span>Iskola</span>
              <span>Regisztrált</span>
              <span>Jóváhagyás (iskola)</span>
              <span>Jóváhagyás (szervező)</span>
              <span>Műveletek</span>
            </Table.Head>
            <Table.Body>
              {applications.map((application, index) => (
                <Table.Row key={index}>
                  <span>{application.name}</span>
                  <span>{application.category}</span>
                  <span>{application.language}</span>
                  <span>{application.school}</span>
                  <span>{application.registeredAt.toDateString()}</span>
                  <span>{application.state_school}</span>
                  <span>{application.state_host}</span>
                  <span className="flex flex-row gap-2">
                    <Button
                      onClick={() => onAccept(application)}
                      color="success"
                    >
                      Accept
                    </Button>
                    <Button onClick={() => onReject(application)} color="error">
                      Reject
                    </Button>
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
