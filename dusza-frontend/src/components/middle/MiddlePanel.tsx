import { Artboard } from "react-daisyui";
import React from "react";

export const MiddlePanel = ({
  title,
  leftButton,
  rightButton,
  children,
}: {
  title: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative">
        {leftButton && (
          <div className="absolute -top-2 left-0">{leftButton}</div>
        )}
        <h1 className="w-full text-center text-4xl">{title}</h1>
        {rightButton && (
          <div className="absolute -top-2 right-0">{rightButton}</div>
        )}
      </div>

      <Artboard className="w-full bg-white p-2">{children}</Artboard>
    </div>
  );
};
