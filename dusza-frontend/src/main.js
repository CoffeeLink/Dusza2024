import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, } from "react-router-dom";
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
const router = createBrowserRouter(createRoutesFromElements(_jsxs(Route, { path: "/", element: _jsx(App, {}), errorElement: _jsx(Error, {}), children: [_jsx(Route, { path: "", element: _jsx(Home, {}) }), _jsx(Route, { path: "register", element: _jsx(Registration, {}) }), _jsx(Route, { path: "login", element: _jsx(Login, {}) }), _jsx(Route, { path: "logout", element: _jsx(Logout, {}) }), _jsxs(Route, { path: "host", element: _jsx(Host, {}), children: [_jsx(Route, { path: "", element: _jsx(Navigate, { to: "schools" }) }), _jsx(Route, { path: "schools", element: _jsx(Schools, {}) }), _jsx(Route, { path: "schools/add", element: _jsx(AddSchool, {}) }), _jsx(Route, { path: "schools/:id", element: _jsx(EditSchool, {}) }), _jsx(Route, { path: "teams", element: _jsx(Teams, {}) }), _jsx(Route, { path: "categories", element: _jsx(Categories, {}) }), _jsx(Route, { path: "categories/add", element: _jsx(AddCategory, {}) }), _jsx(Route, { path: "categories/:id", element: _jsx(EditCategory, {}) }), _jsx(Route, { path: "languages", element: _jsx(Languages, {}) }), _jsx(Route, { path: "languages/add", element: _jsx(AddLanguage, {}) }), _jsx(Route, { path: "languages/:id", element: _jsx(EditLanguage, {}) }), _jsx(Route, { path: "statistics", element: _jsx(Statistics, {}) })] }), _jsxs(Route, { path: "team", element: _jsx(Team, {}), children: [_jsx(Route, { path: "", element: _jsx(Navigate, { to: "view" }) }), _jsx(Route, { path: "view", element: _jsx(View, {}) }), _jsx(Route, { path: "edit", element: _jsx(Edit, {}) })] }), _jsx(Route, { path: "school", element: _jsx(School, {}) })] })));
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(Theme, { dataTheme: "light", children: _jsx(RouterProvider, { router: router }) }) }));
