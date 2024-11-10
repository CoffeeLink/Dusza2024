import {
  //  AdjustmentsVerticalIcon,
  AcademicCapIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Artboard, Menu } from "react-daisyui";
import { Link } from "react-router-dom";

export const TeamMenu = () => {
  return (
    <Artboard className="bg-blue-100 flex">
      <Menu className="w-60 flex flex-col justify-between">
        <div>
          {/*<Menu.Item className="border-b border-blue-200">*/}
          {/*  <Link to="/team">*/}
          {/*    <AdjustmentsVerticalIcon className="w-5" /> Vezérlőpult*/}
          {/*  </Link>*/}
          {/*</Menu.Item>*/}
          <Menu.Item>
            <Link to="/team/applications">
              <AcademicCapIcon className="w-5" /> Jelentkezések
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/team/edit">
              <UserGroupIcon className="w-5" /> Csapat szerkesztése
            </Link>
          </Menu.Item>
        </div>
      </Menu>
    </Artboard>
  );
};
