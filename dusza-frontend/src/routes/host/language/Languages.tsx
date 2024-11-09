import { useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { Link } from "react-router-dom";
import { Button, Table } from "react-daisyui";
import axios from "axios";

type Language = {
  id: number;
  name: string;
};

export const Languages = () => {
  const [languages] = useState<Language[]>([
    {
      id: 1,
      name: "Language 1",
    },
    {
      id: 2,
      name: "Language 2",
    },
    {
      id: 3,
      name: "Language 3",
    },
  ]);

  const onDelete = (id: number) => {
    axios.delete(`/api/languages/${id}`).then(() => {
      console.log("Deleted language with id", id);
    });
  };

  return (
    <MiddlePanel
      title="Programozási nyelvek"
      rightButton={
        <Link to="/host/languages/add">
          <Button color="success">Új nyelv</Button>
        </Link>
      }
    >
      <Table>
        <Table.Head>
          <span>Név</span>
          <span>Műveletek</span>
        </Table.Head>
        <Table.Body>
          {languages.map((language) => (
            <Table.Row key={language.id}>
              <span>{language.name}</span>
              <span className="flex gap-2">
                <Link to={`/host/languages/${language.id}`}>
                  <Button>Szerkesztés</Button>
                </Link>
                <Button color="error" onClick={() => onDelete(language.id)}>
                  Törlés
                </Button>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </MiddlePanel>
  );
};
