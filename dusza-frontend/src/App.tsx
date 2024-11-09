import { Outlet } from "react-router-dom";
import { Header } from "./components/navigation/Header.tsx";
import { Theme } from "react-daisyui";

function App() {
  return (
    <Theme dataTheme={"light"} className="bg-base-300 min-h-screen">
      {/*Common things between routes*/}
      {/*Route specific things*/}
      <Header />
      <div className="w-full flex flex-col gap-4 justify-center items-center p-4">
        <Outlet />
      </div>
    </Theme>
  );
}

export default App;
