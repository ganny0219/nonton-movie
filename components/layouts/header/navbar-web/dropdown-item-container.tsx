import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
};

function DropdownItemContainer({ children, onMouseLeave, onMouseOver }: Props) {
  return (
    <div
      className="relative"
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute w-full md:w-[215px] h-10 z-10" />
      <div className="absolute flex flex-col top-5 p-2 bg-[#000000] z-10">
        {children}
      </div>
    </div>
  );
}

export default DropdownItemContainer;
