import { Button, Table } from "react-daisyui";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { AcademicCapIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { SchoolWithIdAndUser } from "../../../helpers/models.ts";

export const Schools = () => {
  const [schools, setSchools] = useState<SchoolWithIdAndUser[]>([]);

  useEffect(() => {
    AXIOS_INSTANCE.get("/school/").then((res) => {
      const data = JSON.parse(res.data);
      setSchools(data);
    });
  }, []);

  const onDelete = (id: number) => {
    AXIOS_INSTANCE.delete(`/school/${id}`).then(() => {
      setSchools(schools.filter((school) => school.school_id !== id));
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
            <Table.Row key={school.school_id}>
              <span>{school.school_name}</span>
              <span>{school.school_address}</span>
              <span>{school.user.username}</span>
              <span>{school.school_rep_name}</span>
              <span>{school.school_rep_email}</span>
              <span className="flex gap-2">
                <Link to={`/host/schools/${school.school_id}`}>
                <Button className="bg-gray-200"><PencilSquareIcon className="w-5"/> Szerkesztés</Button>
                </Link>
                <Button
                  color="error"
                  onClick={() => onDelete(school.school_id)}
                >
                  <TrashIcon className="w-5"/> Törlés
                </Button>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </MiddlePanel>
  );
};
