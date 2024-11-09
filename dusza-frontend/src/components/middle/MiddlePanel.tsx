import { Artboard } from "react-daisyui";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

export const MiddlePanel = ({
  title,
  leftButtonTitle,
  leftButtonURL,
  rightButton,
  children,
}: {
  title?: string;
  leftButtonTitle?: React.ReactNode;
  leftButtonURL?: string;
  rightButton?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full flex flex-col gap-2 p-20 flex flex-col gap-6 justify-center items-center p-6 bg-slate-100 border border-1 rounded-lg border-slate-500 shadow-lg">
      <div className="w-full flex justify-start">
        {leftButtonTitle && (
          <div className="flex items-center text-gray-500">
            {leftButtonURL ? (
              <Link to={leftButtonURL} className="flex items-center">
                <ArrowLeftIcon className="pt-0.5 h-4.5 w-4 mr-1" /> {leftButtonTitle}
              </Link>
            ) : (
              <span className="flex items-center">
                <ArrowLeftIcon className="pt-0.5 h-4.5 w-4 mr-1" /> {leftButtonTitle}
              </span>
            )}
          </div>
        )}
      </div>
      
      <h1 className="w-full text-center text-4xl font-bold text-gray-800">{title}</h1>
      
      {rightButton && (
        <div className="absolute -top-2 right-0">{rightButton}</div>
      )}
      
      <Artboard className="bg-transparent shadow-none">{children}</Artboard>
    </div>
  );
};
