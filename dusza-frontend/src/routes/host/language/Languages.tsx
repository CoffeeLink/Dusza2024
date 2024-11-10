import { useEffect, useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { Link } from "react-router-dom";
import { Button, Table } from "react-daisyui";
import { LanguageWithId } from "../../../helpers/models.ts";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { CodeBracketIcon } from "@heroicons/react/24/outline";

export const Languages = () => {
  const [languages, setLanguages] = useState<LanguageWithId[]>([]);

  useEffect(() => {
    AXIOS_INSTANCE.get("/language/").then((response) => {
      const data: LanguageWithId[] = JSON.parse(response.data);

      setLanguages(data);
    });
  }, []);

  const onDelete = (id: number) => {
    AXIOS_INSTANCE.delete(`/language/${id}`).then(() => {
      setLanguages((prev) =>
        prev.filter((language) => language.lang_id !== id),
      );
      console.log("Deleted language with id", id);
    });
  };

  return (
    <MiddlePanel
      title="Programozási nyelvek"
      rightButton={
        <Link to="/host/languages/add">
          <Button className="text-white bg-green-700 hover:bg-green-600 active:bg-green-800"><CodeBracketIcon className="w-5"/> Új programozási nyelv</Button>
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
            <Table.Row key={language.lang_id}>
              <span>{language.lang_name}</span>
              <span className="flex gap-2">
                <Link to={`/host/languages/${language.lang_id}`}>
                  <Button>Szerkesztés</Button>
                </Link>
                <Button
                  color="error"
                  onClick={() => onDelete(language.lang_id)}
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
