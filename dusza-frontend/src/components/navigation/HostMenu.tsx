import { Artboard, Menu } from "react-daisyui";
import { Link } from "react-router-dom";

export const HostMenu = () => {
  return (
    <Artboard className="bg-blue-100 h-fit">
      <Menu className="w-full h-fit">
        <Menu.Item className="border-b border-blue-200">
          <Link to="/host">Áttekintés</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/host/schools">Iskolák</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/host/teams">Csapatok</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/host/categories">Kategóriák</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/host/languages">Nyelvek</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/host/statistics">Statisztika</Link>
        </Menu.Item>
      </Menu>
    </Artboard>
  );
};
