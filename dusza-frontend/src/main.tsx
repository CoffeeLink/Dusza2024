import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Registration } from "./routes/team/Registration.tsx";
import { Edit } from "./routes/team/Edit.tsx";
import { Login } from "./routes/Login.tsx";
import { Overview } from "./routes/host/Overview.tsx";
import { Host } from "./routes/host/Host.tsx";
import { Schools } from "./routes/host/school/Schools.tsx";
import { AddSchool } from "./routes/host/school/AddSchool.tsx";
import { EditSchool } from "./routes/host/school/EditSchool.tsx";
import { Categories } from "./routes/host/category/Categories.tsx";
import { Teams } from "./routes/host/team/Teams.tsx";
import { AddCategory } from "./routes/host/category/AddCategory.tsx";
import { EditCategory } from "./routes/host/category/EditCategory.tsx";
import { Home } from "./routes/Home.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="register" element={<Registration />} />
      <Route path="login" element={<Login />} />
      <Route path="host" element={<Host />}>
        <Route path="" element={<Overview />} />
        <Route path="schools" element={<Schools />} />
        <Route path="schools/add" element={<AddSchool />} />
        <Route path="schools/:id" element={<EditSchool />} />
        <Route path="teams" element={<Teams />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="categories/:id" element={<EditCategory />} />
      </Route>
      <Route path="team">
        <Route path="edit" element={<Edit />} />
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
