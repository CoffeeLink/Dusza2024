import { Menu } from "react-daisyui";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../helpers/models.ts";
import { AXIOS_INSTANCE } from "../../main.tsx";
import { AxiosResponse } from "axios";

export const Header = () => {
  const [res, setRes] = useState<AxiosResponse<string> | null>(null);

  useEffect(() => {
    AXIOS_INSTANCE.get("/user/self").then((res) => {
      setRes(res);
    });
  }, []);

  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "bg-gray-300 rounded-lg" : "";

  return (
    <Menu className="w-full bg-base-300 justify-end pr-8" horizontal>
      <Menu.Item className={`mx-2 ${isActive("/")}`}>
        <Link to={"/"}>Főoldal</Link>
      </Menu.Item>

      {res ? (
        <>
          {(() => {
            console.log(res);
            const user_type = JSON.parse(res.data)
              .user_type as User["user_type"];
            if (user_type === "TeamAccount") {
              return (
                <Menu.Item className={`mx-2 ${isActive("/team")}`}>
                  <Link to={"/team"}>Gépház (csapat)</Link>
                </Menu.Item>
              );
            } else if (user_type === "Organizer") {
              return (
                <Menu.Item className={`mx-2 ${isActive("/host")}`}>
                  <Link to={"/host"}>Gépház (szervező)</Link>
                </Menu.Item>
              );
            } else if (user_type === "SchoolRepresentative") {
              return (
                <Menu.Item className={`mx-2 ${isActive("/school")}`}>
                  <Link to={"/school"}>Gépház (iskola)</Link>
                </Menu.Item>
              );
            }
          })()}
          <Menu.Item className={`mx-2 ${isActive("/logout")}`}>
            <Link to={"/logout"}>Kijelentkezés</Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item className={`mx-2 ${isActive("/login")}`}>
            <Link to={"/login"}>Bejelentkezés</Link>
          </Menu.Item>
          <Menu.Item className={`mx-2 ${isActive("/register")}`}>
            <Link to={"/register"}>Regisztráció</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};
