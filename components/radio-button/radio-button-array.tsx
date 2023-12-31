import React from "react";

type Props = {
  name: string;
  label: string;
  value: string;
  disabled?: boolean;
  currentValue: string;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};

function RadioButtonArray({
  name,
  label,
  value,
  currentValue,
  onClick,
  disabled,
}: Props) {
  return (
    <div className="flex flex-row items-center">
      <input
        id={name}
        disabled={disabled ? disabled : undefined}
        type="radio"
        checked={currentValue == value}
        name={name}
        value={value}
        onClick={onClick}
      ></input>
      <label className="ml-2" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default RadioButtonArray;
