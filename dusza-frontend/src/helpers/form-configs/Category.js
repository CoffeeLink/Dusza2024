export const GetAddCategoryConfig = (onChange, fields) => {
    const config = [
        [
            {
                key: "name",
                label: "Név",
                errorFlag: false,
                errorMsg: "",
                value: fields.category_name,
                type: "text",
                required: true,
                onChange: (e) => onChange("category_name", e.target.value),
            },
            {
                key: "description",
                label: "Rövid leírás",
                errorFlag: false,
                errorMsg: "",
                value: fields.category_description || "",
                type: "text",
                onChange: (e) => onChange("category_description", e.target.value),
            },
        ],
        {
            key: "deadline",
            label: "Jelentkezési határidő",
            errorFlag: false,
            errorMsg: "",
            value: fields.category_deadline.split("T")[0],
            type: "date",
            required: true,
            onChange: (e) => onChange("category_deadline", e.target.value),
        },
    ];
    return config;
};
export const GetEditCategoryConfig = (onChange, fields) => {
    return GetAddCategoryConfig(onChange, fields, null);
};
