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
    <div className="w-full flexgap-2 flex-col gap-6 justify-center items-center p-6 bg-slate-100 border border-1 rounded-lg border-slate-500 shadow-lg middle-panel">
      {leftButtonTitle && (
        <div className="w-full flex justify-start items-center mb-4">
          {leftButtonURL ? (
            <Link to={leftButtonURL} className="flex items-center text-gray-500">
              <ArrowLeftIcon className="pt-0.5 h-4.5 w-4 mr-1" /> {leftButtonTitle}
            </Link>
          ) : (
            <span className="flex items-center text-gray-500">
              <ArrowLeftIcon className="pt-0.5 h-4.5 w-4 mr-1" /> {leftButtonTitle}
            </span>
          )}
        </div>
      )}
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-center text-4xl font-bold text-gray-800">
          {title}
        </h1>
        {rightButton && (
          <div className="text-gray-500 ml-4">{rightButton}</div>
        )}
      </div>
      <Artboard className="bg-transparent shadow-none flex justify-start items-start">{children}</Artboard>
    </div>
  );
};
