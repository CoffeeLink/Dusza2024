import { Outlet } from "react-router-dom";
import { Header } from "./components/navigation/Header.tsx";

function App() {
  return (
    <div className="bg-base-300 min-h-screen">
      <Header />
      <div className="w-full flex flex-col gap-4 justify-center items-center p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
