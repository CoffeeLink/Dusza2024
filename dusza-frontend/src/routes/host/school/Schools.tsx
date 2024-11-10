import { Button, Table } from "react-daisyui";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { AXIOS_INSTANCE } from "../../../main.tsx";

type School = {
  id: number;
  name: string;
  location: string;
  username: string;
  contactName: string;
  contactEmail: string;
};

export const Schools = () => {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    AXIOS_INSTANCE.get("/school/").then((res) => {
      const data = JSON.parse(res.data);
      setSchools(data);
    });
  }, []);

  const onDelete = (id: number) => {
    AXIOS_INSTANCE.delete(`/school/${id}`).then(() => {
      console.log("Deleted school with id", id);
    });
  };

  return (
    <MiddlePanel
      title="Iskolák"
      rightButton={
        <Link to="/host/schools/add">
          <Button className="text-white bg-green-700 hover:bg-green-600 active:bg-green-800">
            <AcademicCapIcon className="w-5" /> Új iskola
          </Button>
        </Link>
      }
    >
      <Table>
        <Table.Head>
          <span>Név</span>
          <span>Lokáció</span>
          <span>Felhasználónév</span>
          <span>Kapcsolattartó</span>
          <span>Kapcsolattartó email</span>
          <span>Műveletek</span>
        </Table.Head>
        <Table.Body>
          {schools.map((school) => (
            <Table.Row key={school.id}>
              <span>{school.name}</span>
              <span>{school.location}</span>
              <span>{school.username}</span>
              <span>{school.contactName}</span>
              <span>{school.contactEmail}</span>
              <span className="flex gap-2">
                <Link to={`/host/schools/${school.id}`}>
                  <Button>Szerkesztés</Button>
                </Link>
                <Button color="error" onClick={() => onDelete(school.id)}>
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