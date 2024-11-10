import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HostMenu } from "../../components/navigation/HostMenu.tsx";
import { Outlet } from "react-router-dom";
export const Host = () => {
    return (_jsxs("div", { className: "w-full flex flex-row gap-4 justify-center", children: [_jsx("div", { className: "max-w-80 w-1/4 flex flex-col gap-2", children: _jsx(HostMenu, {}) }), _jsx("div", { className: "max-w-5xl w-full", children: _jsx(Outlet, {}) })] }));
};
