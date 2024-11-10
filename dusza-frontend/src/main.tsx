import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
import { Registration } from "./routes/Registration.tsx";
import { Edit } from "./routes/team/Edit.tsx";
import { Login } from "./routes/Login.tsx";
import { Host } from "./routes/host/Host.tsx";
import { Schools } from "./routes/host/school/Schools.tsx";
import { AddSchool } from "./routes/host/school/AddSchool.tsx";
import { EditSchool } from "./routes/host/school/EditSchool.tsx";
import { Categories } from "./routes/host/category/Categories.tsx";
import { Teams } from "./routes/host/team/Teams.tsx";
import { AddCategory } from "./routes/host/category/AddCategory.tsx";
import { EditCategory } from "./routes/host/category/EditCategory.tsx";
import { Home } from "./routes/Home.tsx";
import { Languages } from "./routes/host/language/Languages.tsx";
import { AddLanguage } from "./routes/host/language/AddLanguage.tsx";
import { EditLanguage } from "./routes/host/language/EditLanguage.tsx";
import { Statistics } from "./routes/host/statistics/Statistics.tsx";
import { Team } from "./routes/team/Team.tsx";
// import { Applications } from "./routes/team/application/Applications.tsx";
// import { AddApplication } from "./routes/team/application/AddApplication.tsx";
// import { EditApplication } from "./routes/team/application/EditApplication.tsx";
import { Logout } from "./routes/Logout.tsx";
import { School } from "./routes/school/School.tsx";
import { Error } from "./Error.tsx";
import { Theme } from "react-daisyui";
import { View } from "./routes/team/View.tsx";

export const API_URL = "http://localhost:8080/api";

export const AXIOS_INSTANCE = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route path="" element={<Home />} />
      <Route path="register" element={<Registration />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="host" element={<Host />}>
        {/*<Route path="" element={<Overview />} />*/}
        <Route path="" element={<Navigate to="schools" />} />
        <Route path="schools" element={<Schools />} />
        <Route path="schools/add" element={<AddSchool />} />
        <Route path="schools/:id" element={<EditSchool />} />
        <Route path="teams" element={<Teams />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="categories/:id" element={<EditCategory />} />
        <Route path="languages" element={<Languages />} />
        <Route path="languages/add" element={<AddLanguage />} />
        <Route path="languages/:id" element={<EditLanguage />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>
      <Route path="team" element={<Team />}>
        <Route path="" element={<Navigate to="view" />} />
        {/*<Route path="applications" element={<Applications />} />*/}
        {/*<Route path="applications/add" element={<AddApplication />} />*/}
        {/*<Route path="applications/:id" element={<EditApplication />} />*/}
        <Route path="view" element={<View />} />
        <Route path="edit" element={<Edit />} />
      </Route>
      <Route path="school" element={<School />}>
        {/*<Route path="applications" element={<App*/}
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme dataTheme={"light"}>
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>,
);
