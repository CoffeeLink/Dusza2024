import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { 
//  AdjustmentsVerticalIcon,
AcademicCapIcon, UserGroupIcon, } from "@heroicons/react/24/outline";
import { Artboard, Menu } from "react-daisyui";
import { Link } from "react-router-dom";
export const TeamMenu = () => {
    return (_jsx(Artboard, { className: "bg-blue-100 flex", children: _jsx(Menu, { className: "w-60 flex flex-col justify-between", children: _jsxs("div", { children: [_jsx(Menu.Item, { children: _jsxs(Link, { to: "/team/view", children: [_jsx(AcademicCapIcon, { className: "w-5" }), " Csapat megtekint\u00E9se"] }) }), _jsx(Menu.Item, { children: _jsxs(Link, { to: "/team/edit", children: [_jsx(UserGroupIcon, { className: "w-5" }), " Csapat szerkeszt\u00E9se"] }) })] }) }) }));
};
