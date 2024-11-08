import './App.scss'
import {Link, Outlet} from "react-router-dom";

function App() {
  return (
    <>
      {/*Common things between routes*/}
      <p>Welcome</p>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to="/registration">Registration</Link>
      {/*Route specific things*/}
      <Outlet />
    </>
  )
}

export default App
