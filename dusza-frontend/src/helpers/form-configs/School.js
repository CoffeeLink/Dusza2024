export const GetEditSchoolConfig = (onChange, fields) => {
    const config = [
        [
            {
                key: "name",
                label: "Iskola neve",
                errorFlag: false,
                errorMsg: "",
                value: fields.school_name,
                type: "text",
                required: true,
                onChange: (e) => onChange("school_name", e.target.value),
            },
            {
                key: "location",
                label: "Iskola címe",
                errorFlag: false,
                errorMsg: "",
                value: fields.school_address,
                type: "text",
                required: true,
                onChange: (e) => onChange("school_address", e.target.value),
            },
        ],
        [
            {
                key: "contactName",
                label: "Kapcsolattartó neve",
                errorFlag: false,
                errorMsg: "",
                value: fields.school_rep_name,
                type: "text",
                onChange: (e) => onChange("school_rep_name", e.target.value),
            },
            {
                key: "contactEmail",
                label: "Kapcsolattartó e-mail címe",
                errorFlag: false,
                errorMsg: "",
                value: fields.school_rep_email,
                type: "email",
                onChange: (e) => onChange("school_rep_email", e.target.value),
            },
        ],
    ];
    return config;
};
export const GetAddSchoolConfig = (onChange, fields) => {
    let config = [
        [
            {
                key: "username",
                label: "Iskola felhasználóneve",
                errorFlag: false,
                errorMsg: "",
                value: fields.username,
                type: "text",
                required: true,
                onChange: (e) => onChange("username", e.target.value),
            },
            {
                key: "password",
                label: "Iskola jelszava",
                errorFlag: false,
                errorMsg: "",
                value: fields.password,
                type: "password",
                required: true,
                onChange: (e) => onChange("password", e.target.value),
            },
        ],
    ];
    config = config.concat(GetEditSchoolConfig(onChange, fields, null));
    return config;
};
