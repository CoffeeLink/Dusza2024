import { HostMenu } from "../../components/navigation/HostMenu.tsx";
import { Outlet } from "react-router-dom";

export const Host = () => {
  return (
    <div className="w-full flex flex-row gap-4 justify-center">
      <div className="max-w-80 w-1/4 flex flex-col gap-2">
        <HostMenu />
      </div>
      <div className="max-w-5xl w-full">
        <Outlet />
      </div>
    </div>
  );
};
