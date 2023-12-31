import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
};

function CastContainer({ title, children }: Props) {
  return (
    <div className="flex flex-col">
      <p className="text-2xl mb-2">{title}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">{children}</div>
    </div>
  );
}

export default CastContainer;
