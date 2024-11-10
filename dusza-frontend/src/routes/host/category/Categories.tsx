import { Link } from "react-router-dom";
import { Button, Table } from "react-daisyui";
import { useEffect, useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { CategoryWithId } from "../../../helpers/models.ts";
import { countDown } from "../../../helpers/time.ts";

export const Categories = () => {
  const [categories, setCategories] = useState<CategoryWithId[]>([]);

  useEffect(() => {
    AXIOS_INSTANCE.get("/category/").then((res) => {
      const data = JSON.parse(res.data);
      setCategories(data);
    });
  }, []);

  const onClose = (id: number) => {
    // Get the category with the given id and set its state to "closed"
    const category = categories.find((category) => category.category_id === id);

    AXIOS_INSTANCE.put(`/category/${id}`, {
      ...category,
      category_state: "closed",
    }).then(() => {
      console.log("Closed category with id", id);
    });
  };

  const onDelete = (id: number) => {
    AXIOS_INSTANCE.delete(`/category/${id}`).then(() => {
      console.log("Deleted category with id", id);
    });
  };

  return (
    <MiddlePanel
      title="Kategóriák"
      rightButton={
        <Link to="/host/categories/add">
          <Button className="text-white bg-green-700 hover:bg-green-600 active:bg-green-800">
            <SquaresPlusIcon className="w-5" /> Új kategória
          </Button>
        </Link>
      }
    >
      <Table>
        <Table.Head>
          <span>Név</span>
          <span>Leírás</span>
          <span>Határidő</span>
          <span>Műveletek</span>
        </Table.Head>
        <Table.Body>
          {categories.map((category) => (
            <Table.Row key={category.category_id}>
              <span>{category.category_name}</span>
              <span>{category.category_description}</span>
              <span>
                {countDown(new Date(Date.parse(category.category_deadline)))}
              </span>
              <span className="flex gap-2">
                <Button
                  color="warning"
                  onClick={() => onClose(category.category_id)}
                >
                  Lezárás
                </Button>
                <Link to={`/host/categories/${category.category_id}`}>
                  <Button>Szerkesztés</Button>
                </Link>
                <Button
                  color="error"
                  onClick={() => onDelete(category.category_id)}
                >
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
