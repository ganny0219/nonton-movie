import React, { ReactNode } from "react";

type Props = {
  title?: string;
  children?: ReactNode;
  mainPage?: boolean;
};

async function PageContainer({ title, children, mainPage }: Props) {
  return (
    <div
      className={`${mainPage ? "w-[85%]" : "w-full"}  m-auto text-[#fff] ${
        title ? "sm:mt-10" : ""
      } `}
    >
      {title && (
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-1 h-1 bg-[#FFFFFF14]" />
          <h1 className="mx-4 text-3xl font-bold text-center">
            {title.toUpperCase()}
          </h1>
          <div className="flex flex-1 h-1 bg-[#FFFFFF14]" />
        </div>
      )}
      {children}
    </div>
  );
}

export default PageContainer;
