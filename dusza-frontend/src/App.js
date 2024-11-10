import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { Header } from "./components/navigation/Header.tsx";
function App() {
    return (_jsxs("div", { className: "bg-base-300 min-h-screen", children: [_jsx(Header, {}), _jsx("div", { className: "w-full flex flex-col gap-4 justify-center items-center p-4", children: _jsx(Outlet, {}) })] }));
}
export default App;
