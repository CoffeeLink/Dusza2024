import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { Artboard, Menu } from "react-daisyui";
import { Link } from "react-router-dom";
export const SchoolMenu = () => {
    return (_jsx(Artboard, { className: "bg-blue-100 flex", children: _jsx(Menu, { className: "w-60 flex flex-col justify-between", children: _jsx("div", { children: _jsx(Menu.Item, { children: _jsxs(Link, { to: "/team/applications", children: [_jsx(AcademicCapIcon, { className: "w-5" }), " Jelentkez\u00E9sek"] }) }) }) }) }));
};
