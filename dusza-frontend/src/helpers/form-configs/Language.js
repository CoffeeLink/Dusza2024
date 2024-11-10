export const GetAddLanguageConfig = (onChange, fields) => {
    const config = [
        {
            key: "name",
            label: "Név",
            errorFlag: false,
            errorMsg: "",
            value: fields.lang_name,
            type: "text",
            required: true,
            onChange: (e) => onChange("lang_name", e.target.value),
        },
    ];
    return config;
};
export const GetEditLanguageConfig = (onChange, fields) => {
    return GetAddLanguageConfig(onChange, fields, null);
};
