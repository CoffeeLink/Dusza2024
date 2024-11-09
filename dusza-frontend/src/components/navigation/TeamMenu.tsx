import {
  AdjustmentsVerticalIcon,
  ArrowLeftStartOnRectangleIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Artboard, Menu } from "react-daisyui";
import { Link } from "react-router-dom";

export const TeamMenu = () => {
  return (
    <Artboard className="bg-blue-100 h-screen flex">
      <Menu className="w-60 h-full flex flex-col justify-between">
        <div>
          <Menu.Item className="border-b border-blue-200">
            <Link to="/team">
              <AdjustmentsVerticalIcon className="w-5" /> Vezérlőpult
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/team/applications">
              <AcademicCapIcon className="w-5" /> Jelentkezések
            </Link>
          </Menu.Item>
        </div>
        <Menu.Item className="border-t border-blue-200 mt-auto">
          <Link to="/" className="text-gray-500">
            <ArrowLeftStartOnRectangleIcon className="w-5" /> Kijelentkezés
          </Link>
        </Menu.Item>
      </Menu>
    </Artboard>
  );
};
