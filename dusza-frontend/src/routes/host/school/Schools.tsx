import { Button, Table } from "react-daisyui";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";

type School = {
  id: number;
  name: string;
  location: string;
  username: string;
  contactName: string;
  contactEmail: string;
};

export const Schools = () => {
  const [schools] = useState<School[]>([
    {
      id: 1,
      name: "School 1",
      location: "Location",
      username: "Username",
      contactName: "Contact Name",
      contactEmail: "Contact Email",
    },
    {
      id: 2,
      name: "School 2",
      location: "Location",
      username: "Username",
      contactName: "Contact Name",
      contactEmail: "Contact Email",
    },
    {
      id: 3,
      name: "School 3",
      location: "Location",
      username: "Username",
      contactName: "Contact Name",
      contactEmail: "Contact Email",
    },
  ]);

  const onDelete = (id: number) => {
    axios.delete(`/api/schools/${id}`).then(() => {
      console.log("Deleted school with id", id);
    });
  };

  return (
    <MiddlePanel
      title={"Schools"}
      rightButton={
        <Link to="/host/schools/add">
          <Button color="success">Add School</Button>
        </Link>
      }
    >
      <Table>
        <Table.Head>
          <span>Name</span>
          <span>Location</span>
          <span>Username</span>
          <span>Contact Name</span>
          <span>Contact Email</span>
          <span>Actions</span>
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
                  <Button>Edit</Button>
                </Link>
                <Button color="error" onClick={() => onDelete(school.id)}>
                  Delete
                </Button>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </MiddlePanel>
  );
};
