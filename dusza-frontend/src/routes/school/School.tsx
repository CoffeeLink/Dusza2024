import { SchoolMenu } from "../../components/navigation/SchoolMenu.tsx";

export const School = () => {
  return (
    <div className="w-full flex flex-row gap-4 justify-center">
      <div className="max-w-80 w-1/4 flex flex-col gap-2">
        <SchoolMenu />
      </div>
      <div className="max-w-5xl w-full">
        {/*<Outlet />*/}
        {/* Rogton ide mehet egy tablazat elfogadas es visszakuldes gombbal */}
        {/* Sot, akkor innen vagyuk is ki a menut */}
      </div>
    </div>
  );
};
