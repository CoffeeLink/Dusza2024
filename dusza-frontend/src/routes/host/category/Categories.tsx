import { Link } from "react-router-dom";
import { Artboard, Button, Table } from "react-daisyui";
import { useState } from "react";
import axios from "axios";

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

  const onDelete = (id: number) => {
    axios.delete(`/api/categories/${id}`).then(() => {
      console.log("Deleted category with id", id);
    });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative">
        <h1 className="w-full text-center text-4xl">Categories</h1>
        <Link to="/host/categories/add" className="absolute -top-2 right-0">
          <Button color="success">Add Category</Button>
        </Link>
      </div>

      <Artboard className="w-full bg-white p-2">
        <Table>
          <Table.Head>
            <span>Name</span>
            <span>Description</span>
            <span>Actions</span>
          </Table.Head>
          <Table.Body>
            {categories.map((category) => (
              <Table.Row key={category.id}>
                <span>{category.name}</span>
                <span>{category.description}</span>
                <span className="flex gap-2">
                  <Link to={`/host/categories/${category.id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button color="error" onClick={() => onDelete(category.id)}>
                    Delete
                  </Button>
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Artboard>
    </div>
  );
};
