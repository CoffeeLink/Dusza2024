import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { 
// AdjustmentsVerticalIcon,
ChartPieIcon, Squares2X2Icon, AcademicCapIcon, UserGroupIcon, CodeBracketIcon, } from "@heroicons/react/24/outline";
import { Artboard, Menu } from "react-daisyui";
import { Link } from "react-router-dom";
export const HostMenu = () => {
    return (_jsx(Artboard, { className: "bg-blue-100 flex", children: _jsx(Menu, { className: "w-60 flex flex-col justify-between", children: _jsxs("div", { children: [_jsx(Menu.Item, { children: _jsxs(Link, { to: "/host/schools", children: [_jsx(AcademicCapIcon, { className: "w-5" }), " Iskol\u00E1k"] }) }), _jsx(Menu.Item, { children: _jsxs(Link, { to: "/host/teams", children: [_jsx(UserGroupIcon, { className: "w-5" }), " Csapatok"] }) }), _jsx(Menu.Item, { children: _jsxs(Link, { to: "/host/categories", children: [_jsx(Squares2X2Icon, { className: "w-5" }), " Kateg\u00F3ri\u00E1k"] }) }), _jsx(Menu.Item, { children: _jsxs(Link, { to: "/host/languages", children: [_jsx(CodeBracketIcon, { className: "w-5" }), " Programoz\u00E1si nyelvek"] }) }), _jsx(Menu.Item, { children: _jsxs(Link, { to: "/host/statistics", children: [_jsx(ChartPieIcon, { className: "w-5" }), " Statisztik\u00E1k"] }) })] }) }) }));
};
