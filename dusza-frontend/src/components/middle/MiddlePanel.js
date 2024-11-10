import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Artboard } from "react-daisyui";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
export const MiddlePanel = ({ title, leftButtonTitle, leftButtonURL, rightButton, children, }) => {
    return (_jsxs("div", { className: "w-full flexgap-2 flex-col gap-6 justify-center items-center p-6 bg-slate-100 border border-1 rounded-lg border-slate-500 shadow-lg middle-panel", children: [leftButtonTitle && (_jsx("div", { className: "w-full flex justify-start items-center mb-4", children: leftButtonURL ? (_jsxs(Link, { to: leftButtonURL, className: "flex items-center text-gray-500", children: [_jsx(ArrowLeftIcon, { className: "pt-0.5 h-4.5 w-4 mr-1" }), " ", leftButtonTitle] })) : (_jsxs("span", { className: "flex items-center text-gray-500", children: [_jsx(ArrowLeftIcon, { className: "pt-0.5 h-4.5 w-4 mr-1" }), " ", leftButtonTitle] })) })), _jsxs("div", { className: "w-full flex justify-between items-center mb-4", children: [title && title !== "Főoldal" && (_jsx("h1", { className: "text-center text-4xl font-bold text-gray-800", children: title })), rightButton && (_jsx("div", { className: "text-gray-500 ml-4", children: rightButton }))] }), _jsx(Artboard, { className: "bg-transparent shadow-none flex justify-start items-start", children: children })] }));
};
