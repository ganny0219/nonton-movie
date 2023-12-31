import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function HeaderContainer({ children }: Props) {
  return (
    <div
      id="root-header"
      className="w-full border-b-[1px] border-[#363636] border-solid"
    >
      <div className="flex flex-row w-[95%] m-auto py-4 ">{children}</div>
    </div>
  );
}

export default HeaderContainer;
