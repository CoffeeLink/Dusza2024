import { Outlet } from "react-router-dom";
import { TeamMenu } from "../../components/navigation/TeamMenu.tsx";

export const Team = () => {
  return (
    <div className="w-full flex flex-row gap-4 justify-center">
      <div className="max-w-80 w-1/4 flex flex-col gap-2">
        <TeamMenu />
      </div>
      <div className="max-w-5xl w-full">
        <Outlet />
      </div>
    </div>
  );
};
