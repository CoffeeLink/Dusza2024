import { GetConfig } from "../../components/FormFactory.tsx";
type ApplicationFields = {
    category: string;
    school: string;
    language: string;
};
export declare const GetAddApplicationConfig: GetConfig<ApplicationFields, {
    categories: string[];
    schools: string[];
    languages: string[];
}>;
export declare const GetEditApplicationConfig: GetConfig<ApplicationFields, {
    categories: string[];
    schools: string[];
    languages: string[];
}>;
export {};
