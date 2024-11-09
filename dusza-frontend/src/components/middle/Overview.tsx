import React from "react";
import { Artboard } from "react-daisyui";

interface CardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const Overview = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactElement<CardProps>[];
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="w-full text-center text-4xl">{title}</h1>
      <div className="flex gap-4 flex-wrap content-stretch">
        {children.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, children, className }: CardProps) => {
  return (
    <Artboard
      className={`gap-4 p-4 flex-1 min-w-72 justify-start h-fit bg-white ${className || ""}`}
    >
      <h2 className="text-2xl w-full">{title}</h2>
      {children}
    </Artboard>
  );
};

Overview.Card = Card;

export { Overview };
