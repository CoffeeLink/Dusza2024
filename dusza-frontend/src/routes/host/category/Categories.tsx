import { Link } from "react-router-dom";
import { Button, Table } from "react-daisyui";
import { useEffect, useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { LockClosedIcon, LockOpenIcon, PencilSquareIcon, SquaresPlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { Category, CategoryWithId } from "../../../helpers/models.ts";
import { countDown } from "../../../helpers/time.ts";

export const Categories = () => {
  const [categories, setCategories] = useState<CategoryWithId[]>([]);

  useEffect(() => {
    AXIOS_INSTANCE.get("/category/").then((res) => {
      const data = JSON.parse(res.data);
      setCategories(data);
    });
  }, []);

  // const onClose = (id: number) => {
  //   // Get the category with the given id and set its state to "closed"
  //   const category = categories.find((category) => category.category_id === id);
  //
  //   AXIOS_INSTANCE.put(`/category/${id}`, {
  //     ...category,
  //     category_state: "Closed",
  //   }).then(() => {
  //     // update the category in the list
  //     setCategories((prev) =>
  //       prev.map((category) =>
  //         category.category_id === id
  //           ? {
  //               ...category,
  //               category_state: "Closed" as Category["category_state"],
  //             }
  //           : category,
  //       ),
  //     );
  //     console.log("Closed category with id", id);
  //   });
  // };

  const setCategoryState = (id: number, state: "Open" | "Closed") => {
    // Get the category with the given id and set its state to "closed"
    const category = categories.find((category) => category.category_id === id);

    AXIOS_INSTANCE.put(`/category/${id}`, {
      ...category,
      category_state: state,
    }).then(() => {
      // update the category in the list
      setCategories((prev) =>
        prev.map((category) =>
          category.category_id === id
            ? {
                ...category,
                category_state: state as Category["category_state"],
              }
            : category,
        ),
      );
      console.log("Changed category state to", state, "with id", id);
    });
  };

  const onDelete = (id: number) => {
    AXIOS_INSTANCE.delete(`/category/${id}`).then(() => {
      // remove the category from the list
      setCategories((prev) =>
        prev.filter((category) => category.category_id !== id),
      );
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
                {/*<Button*/}
                {/*  color="warning"*/}
                {/*  onClick={() => onClose(category.category_id)}*/}
                {/*>*/}
                {/*  Lezárás*/}
                {/*</Button>*/}
                {category.category_state === "Open" ? (
                  <Button
                    color="warning"
                    onClick={() =>
                      setCategoryState(category.category_id, "Closed")
                    }
                  >
                    <LockClosedIcon className="w-5"/> Lezárás
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onClick={() =>
                      setCategoryState(category.category_id, "Open")
                    }
                  >
                    <LockOpenIcon className="w-5" /> Megnyitás
                  </Button>
                )}
                <Link to={`/host/categories/${category.category_id}`}>
                  <Button className="bg-gray-200"><PencilSquareIcon className="w-5"/> Szerkesztés</Button>
                </Link>
                <Button
                  color="error"
                  onClick={() => onDelete(category.category_id)}
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
