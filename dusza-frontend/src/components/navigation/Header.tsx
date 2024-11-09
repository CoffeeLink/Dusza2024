import { Menu } from "react-daisyui";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "bg-gray-300 rounded-lg" : "";

  return (
    <Menu className="w-full bg-base-300 justify-end pr-8" horizontal>
      <Menu.Item className={`mx-2 ${isActive("/")}`}>
        <Link to={"/"}>Főoldal</Link>
      </Menu.Item>
      <Menu.Item className={`mx-2 ${isActive("/login")}`}>
        <Link to={"/login"}>Bejelentkezés</Link>
      </Menu.Item>
      <Menu.Item className={`mx-2 ${isActive("/register")}`}>
        <Link to={"/register"}>Regisztráció</Link>
      </Menu.Item>
      <Menu.Item className={`mx-2 ${isActive("/host")}`}>
        <Link to={"/host"}>Host</Link>
      </Menu.Item>
      <Menu.Item className={`mx-2 ${isActive("/team")}`}>
        <Link to={"/team"}>Team</Link>
      </Menu.Item>
    </Menu>
  );
};
