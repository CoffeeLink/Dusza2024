import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Artboard } from "react-daisyui";
const Overview = ({ title, children, }) => {
    return (_jsxs("div", { className: "w-full flex flex-col gap-2", children: [_jsx("h1", { className: "w-full text-center text-4xl", children: title }), _jsx("div", { className: "flex gap-4 flex-wrap content-stretch", children: children.map((child, index) => (_jsx("div", { children: child }, index))) })] }));
};
const Card = ({ title, children, className }) => {
    return (_jsxs(Artboard, { className: `gap-4 p-4 flex-1 min-w-72 justify-start h-fit bg-white ${className || ""}`, children: [_jsx("h2", { className: "text-2xl w-full", children: title }), children] }));
};
Overview.Card = Card;
export { Overview };
