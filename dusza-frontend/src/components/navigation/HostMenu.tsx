import { Artboard, Menu } from "react-daisyui";
import { Link } from "react-router-dom";

export const HostMenu = () => {
  return (
    <Artboard className="bg-blue-100 h-fit">
      <Menu className="w-full h-fit">
        <Menu.Item className="border-b border-blue-200">
          <Link to="/host">Overview</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/host/schools">Schools</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/host/teams">Teams</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/host/categories">Categories</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/host/statistics">Statistics</Link>
        </Menu.Item>
      </Menu>
    </Artboard>
  );
};
