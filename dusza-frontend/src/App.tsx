import "./App.scss";
import { Link, Outlet } from "react-router-dom";
import { Header } from "./components/Header.tsx";
import { Theme } from "react-daisyui";

function App() {
  return (
    <Theme dataTheme={"light"}>
      {/*Common things between routes*/}
      <Header />
      <p>Welcome</p>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to="/registration">Registration</Link>
      <br />
      <Link to={"/edit"}>Edit</Link>
      <br />
      <Link to={"/login"}>Login</Link>
      {/*Route specific things*/}
      <div className="w-fit mx-auto">
        <Outlet />
      </div>
    </Theme>
  );
}

export default App;
