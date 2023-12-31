import React from "react";

type Props = {
  selected: string;
  title: string;
  selectedHandler: (selected: string) => void;
};

function SelectButton({ selected, title, selectedHandler }: Props) {
  return (
    <button
      className={`${
        selected == title ? "bg-secondary text-[#313131]" : "text-[#fff]"
      } rounded py-1 px-4 text-sm md:text-base`}
      onClick={() => selectedHandler(title)}
    >
      {title}
    </button>
  );
}

export default SelectButton;
