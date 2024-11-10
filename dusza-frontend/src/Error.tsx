import { MiddlePanel } from "./components/middle/MiddlePanel.tsx";
import { Header } from "./components/navigation/Header.tsx";

export const Error = () => {
  return (
    <div className="bg-base-300 min-h-screen">
      {/*Common things between routes*/}
      {/*Route specific things*/}
      <Header />
      <div className="w-full flex flex-col gap-4 justify-center items-center p-4">
        <div className="max-w-5xl w-full">
          <MiddlePanel title="Hiba">
            <p>Kérlek próbáld újra később!</p>
          </MiddlePanel>
        </div>
      </div>
    </div>
  );
};
