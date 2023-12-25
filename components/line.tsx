import React from "react";

type Props = {
  thin?: boolean;
  margin?: string;
  color?: string;
};

function Line({ thin, margin, color }: Props) {
  return (
    <div
      className={`w-full ${thin ? `border-t-[1px]` : "border-t-2"}
        ${margin ? `my-${margin}` : "my-1"}
      } border-solid ${color ? `border-[${color}]` : "border-[#313131]"}`}
    />
  );
}

export default Line;
