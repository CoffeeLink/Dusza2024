import { Artboard } from "react-daisyui";
import React from "react";

export const MiddlePanel = ({
  title,
  leftButton,
  rightButton,
  children,
}: {
  title?: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col gap-2 p-20 flex flex-col gap-6 justify-center items-center p-6 bg-slate-50 border border-1 rounded-lg border-slate-500 shadow-lg">
      <div className="relative">
        {leftButton && (
          <div className="absolute -top-2 left-0">{leftButton}</div>
        )}
        <h1 className="w-full text-center text-4xl font-bold text-gray-800">{title}</h1>
        
        {rightButton && (
          <div className="absolute -top-2 right-0">{rightButton}</div>
        )}
      </div>
      
      <Artboard className="bg-transparent shadow-none">{children}</Artboard>
    </div>
  );
};
