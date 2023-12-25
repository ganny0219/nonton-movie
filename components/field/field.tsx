import React from "react";

type Props = {
  name: string;
  type?: string;
  defaultValue?: string;
  value?: string;
  conf?: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
};

function Field({
  name,
  type,
  conf,
  defaultValue,
  required,
  value,
  placeholder,
  disabled,
}: Props) {
  return (
    <div className="flex flex-col w-full justify-center">
      <label className="text-xl">{name}</label>
      <input
        required={required ? required : undefined}
        className="rounded outline-none p-1 disabled:text-[#31313190]"
        defaultValue={defaultValue ? defaultValue : undefined}
        value={value != undefined ? value : undefined}
        type={type ? type : "text"}
        placeholder={placeholder}
        {...conf}
        disabled={disabled ? disabled : undefined}
      />
    </div>
  );
}

export default Field;
