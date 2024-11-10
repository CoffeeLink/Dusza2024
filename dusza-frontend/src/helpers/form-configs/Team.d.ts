import { GetConfig } from "../../components/FormFactory.tsx";
import { CategoryWithId, LanguageWithId, SchoolWithId, TeamEdit, TeamRegistration, UsernamePassword } from "../models.ts";
export declare const GetLoginConfig: GetConfig<UsernamePassword>;
export declare const GetEditConfig: GetConfig<TeamEdit, {
    languages: LanguageWithId[];
    categories: CategoryWithId[];
}>;
export declare const GetRegistrationConfig: GetConfig<TeamRegistration, {
    schools: SchoolWithId[];
    languages: LanguageWithId[];
    categories: CategoryWithId[];
}>;
