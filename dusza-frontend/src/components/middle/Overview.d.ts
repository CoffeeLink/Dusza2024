import React from "react";
interface CardProps {
    title: string;
    className?: string;
    children: React.ReactNode;
}
declare const Overview: {
    ({ title, children, }: {
        title: string;
        children: React.ReactElement<CardProps>[];
    }): import("react/jsx-runtime").JSX.Element;
    Card: ({ title, children, className }: CardProps) => import("react/jsx-runtime").JSX.Element;
};
export { Overview };
