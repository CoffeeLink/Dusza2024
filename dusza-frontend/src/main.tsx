import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter, createRoutesFromElements, Route,
  RouterProvider,
} from "react-router-dom";
import {Registration} from "./routes/Registration.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="registration" element={<Registration />} />
    </Route>
  ),
);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
