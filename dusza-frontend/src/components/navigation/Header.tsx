import { Menu } from "react-daisyui";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Menu className="w-full bg-base-300 justify-end pr-8" horizontal>
      <Menu.Item>
        <Link to={"/"}>Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={"/login"}>Login</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={"/register"}>Register</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={"/host"}>Host</Link>
      </Menu.Item>
    </Menu>
  );
};
