import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Button, Table } from "react-daisyui";
import { useEffect, useState } from "react";
import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import { AXIOS_INSTANCE } from "../../../main.tsx";
import { countDown } from "../../../helpers/time.ts";
export const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        AXIOS_INSTANCE.get("/category/").then((res) => {
            const data = JSON.parse(res.data);
            setCategories(data);
        });
    }, []);
    // const onClose = (id: number) => {
    //   // Get the category with the given id and set its state to "closed"
    //   const category = categories.find((category) => category.category_id === id);
    //
    //   AXIOS_INSTANCE.put(`/category/${id}`, {
    //     ...category,
    //     category_state: "Closed",
    //   }).then(() => {
    //     // update the category in the list
    //     setCategories((prev) =>
    //       prev.map((category) =>
    //         category.category_id === id
    //           ? {
    //               ...category,
    //               category_state: "Closed" as Category["category_state"],
    //             }
    //           : category,
    //       ),
    //     );
    //     console.log("Closed category with id", id);
    //   });
    // };
    const setCategoryState = (id, state) => {
        // Get the category with the given id and set its state to "closed"
        const category = categories.find((category) => category.category_id === id);
        AXIOS_INSTANCE.put(`/category/${id}`, {
            ...category,
            category_state: state,
        }).then(() => {
            // update the category in the list
            setCategories((prev) => prev.map((category) => category.category_id === id
                ? {
                    ...category,
                    category_state: state,
                }
                : category));
            console.log("Changed category state to", state, "with id", id);
        });
    };
    const onDelete = (id) => {
        AXIOS_INSTANCE.delete(`/category/${id}`).then(() => {
            // remove the category from the list
            setCategories((prev) => prev.filter((category) => category.category_id !== id));
            console.log("Deleted category with id", id);
        });
    };
    return (_jsx(MiddlePanel, { title: "Kateg\u00F3ri\u00E1k", rightButton: _jsx(Link, { to: "/host/categories/add", children: _jsxs(Button, { className: "text-white bg-green-700 hover:bg-green-600 active:bg-green-800", children: [_jsx(SquaresPlusIcon, { className: "w-5" }), " \u00DAj kateg\u00F3ria"] }) }), children: _jsxs(Table, { children: [_jsxs(Table.Head, { children: [_jsx("span", { children: "N\u00E9v" }), _jsx("span", { children: "Le\u00EDr\u00E1s" }), _jsx("span", { children: "Hat\u00E1rid\u0151" }), _jsx("span", { children: "M\u0171veletek" })] }), _jsx(Table.Body, { children: categories.map((category) => (_jsxs(Table.Row, { children: [_jsx("span", { children: category.category_name }), _jsx("span", { children: category.category_description }), _jsx("span", { children: countDown(new Date(Date.parse(category.category_deadline))) }), _jsxs("span", { className: "flex gap-2", children: [category.category_state === "Open" ? (_jsx(Button, { color: "warning", onClick: () => setCategoryState(category.category_id, "Closed"), children: "Lez\u00E1r\u00E1s" })) : (_jsx(Button, { color: "success", onClick: () => setCategoryState(category.category_id, "Open"), children: "Megnyit\u00E1s" })), _jsx(Link, { to: `/host/categories/${category.category_id}`, children: _jsx(Button, { children: "Szerkeszt\u00E9s" }) }), _jsx(Button, { color: "error", onClick: () => onDelete(category.category_id), children: "T\u00F6rl\u00E9s" })] })] }, category.category_id))) })] }) }));
};
