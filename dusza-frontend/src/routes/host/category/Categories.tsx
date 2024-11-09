import { Link } from "react-router-dom";
import { Button, Table } from "react-daisyui";
import { useState } from "react";
import axios from "axios";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

type Category = {
  id: number;
  name: string;
  description: string;
};

export const Categories = () => {
  const [categories] = useState<Category[]>([
    {
      id: 1,
      name: "Category 1",
      description: "Description",
    },
    {
      id: 2,
      name: "Category 2",
      description: "Description",
    },
    {
      id: 3,
      name: "Category 3",
      description: "Description",
    },
  ]);

  const onClose = (id: number) => {
    axios.put(`/api/categories/${id}/close`).then(() => {
      console.log("Closed category with id", id);
    });
  };

  const onDelete = (id: number) => {
    axios.delete(`/api/categories/${id}`).then(() => {
      console.log("Deleted category with id", id);
    });
  };

  return (
    <MiddlePanel
      title="Kategóriák"
      rightButton={
        <Link to="/host/categories/add">
          <Button className="text-white bg-green-700 hover:bg-green-600 active:bg-green-800"><SquaresPlusIcon className="w-5" /> Új kategória</Button>
        </Link>
      }
    >
      <Table>
        <Table.Head>
          <span>Név</span>
          <span>Leírás</span>
          <span>Műveletek</span>
        </Table.Head>
        <Table.Body>
          {categories.map((category) => (
            <Table.Row key={category.id}>
              <span>{category.name}</span>
              <span>{category.description}</span>
              <span className="flex gap-2">
                <Button color="warning" onClick={() => onClose(category.id)}>
                  Lezárás
                </Button>
                <Link to={`/host/categories/${category.id}`}>
                  <Button>Szerkesztés</Button>
                </Link>
                <Button color="error" onClick={() => onDelete(category.id)}>
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
