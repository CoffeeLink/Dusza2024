import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { Artboard, Menu } from "react-daisyui";
import { Link } from "react-router-dom";

export const SchoolMenu = () => {
  return (
    <Artboard className="bg-blue-100 flex">
      <Menu className="w-60 flex flex-col justify-between">
        <div>
          <Menu.Item>
            <Link to="/team/applications">
              <AcademicCapIcon className="w-5" /> Jelentkezések
            </Link>
          </Menu.Item>
        </div>
      </Menu>
    </Artboard>
  );
};
