import { AdjustmentsVerticalIcon, ArrowLeftStartOnRectangleIcon, ChartPieIcon, Squares2X2Icon, AcademicCapIcon, UserGroupIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { Artboard, Menu } from "react-daisyui";
import { Link } from "react-router-dom";

export const HostMenu = () => {
  return (
    <Artboard className="bg-blue-100 h-screen flex">
      <Menu className="w-60 h-full flex flex-col justify-between">
        <div>
          <Menu.Item className="border-b border-blue-200">
            <Link to="/host"><AdjustmentsVerticalIcon className="w-5" /> Vezérlőpult</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/host/schools"><AcademicCapIcon className="w-5" /> Iskolák</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/host/teams"><UserGroupIcon className="w-5" /> Csapatok</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/host/categories"><Squares2X2Icon className="w-5" /> Kategóriák</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/host/languages"><CodeBracketIcon className="w-5" /> Programozási nyelvek</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/host/statistics"><ChartPieIcon className="w-5" /> Statisztikák</Link>
          </Menu.Item>
        </div>
        <Menu.Item className="border-t border-blue-200 mt-auto">
          <Link to="/" className="text-gray-500"><ArrowLeftStartOnRectangleIcon className="w-5" /> Kijelentkezés</Link>
        </Menu.Item>
      </Menu>
    </Artboard>
  );
};