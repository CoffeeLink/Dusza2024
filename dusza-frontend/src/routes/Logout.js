import { AXIOS_INSTANCE } from "../main.tsx";
export const Logout = () => {
    // delete Authorization cookie
    AXIOS_INSTANCE.post("/logout").then(() => {
        window.location.href = "/";
    });
    return null;
};
