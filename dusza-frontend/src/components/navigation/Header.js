import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from "react-daisyui";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AXIOS_INSTANCE } from "../../main.tsx";
export const Header = () => {
    const [res, setRes] = useState(null);
    useEffect(() => {
        AXIOS_INSTANCE.get("/user/self").then((res) => {
            setRes(res);
        });
    }, []);
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? "bg-gray-300 rounded-lg" : "";
    return (_jsxs(Menu, { className: "w-full bg-base-300 justify-end pr-8", horizontal: true, children: [_jsx(Menu.Item, { className: `mx-2 ${isActive("/")}`, children: _jsx(Link, { to: "/", children: "F\u0151oldal" }) }), res ? (_jsxs(_Fragment, { children: [(() => {
                        console.log(res);
                        const user_type = JSON.parse(res.data)
                            .user_type;
                        if (user_type === "TeamAccount") {
                            return (_jsx(Menu.Item, { className: `mx-2 ${isActive("/team")}`, children: _jsx(Link, { to: "/team", children: "G\u00E9ph\u00E1z (csapat)" }) }));
                        }
                        else if (user_type === "Organizer") {
                            return (_jsx(Menu.Item, { className: `mx-2 ${isActive("/host")}`, children: _jsx(Link, { to: "/host", children: "G\u00E9ph\u00E1z (szervez\u0151)" }) }));
                        }
                        else if (user_type === "SchoolRepresentative") {
                            return (_jsx(Menu.Item, { className: `mx-2 ${isActive("/school")}`, children: _jsx(Link, { to: "/school", children: "G\u00E9ph\u00E1z (iskola)" }) }));
                        }
                    })(), _jsx(Menu.Item, { className: `mx-2 ${isActive("/logout")}`, children: _jsx(Link, { to: "/logout", children: "Kijelentkez\u00E9s" }) })] })) : (_jsxs(_Fragment, { children: [_jsx(Menu.Item, { className: `mx-2 ${isActive("/login")}`, children: _jsx(Link, { to: "/login", children: "Bejelentkez\u00E9s" }) }), _jsx(Menu.Item, { className: `mx-2 ${isActive("/register")}`, children: _jsx(Link, { to: "/register", children: "Regisztr\u00E1ci\u00F3" }) })] }))] }));
};
