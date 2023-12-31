import React from "react";

type Props = {
  name?: string;
  type?: string;
  defaultValue?: string;
  value?: string;
  conf?: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  unedit?: boolean;
};

function FieldHorizontal({
  name,
  type,
  conf,
  defaultValue,
  value,
  placeholder,
  disabled,
  required,
  unedit,
}: Props) {
  return (
    <div className="flex flex-row w-full items-center my-2">
      {name && <label className="mx-2 whitespace-nowrap">{name}</label>}
      <input
        readOnly={unedit ? true : false}
        className="rounded outline-none p-1 w-full mr-2 disabled:text-[#31313190]"
        defaultValue={defaultValue ? defaultValue : undefined}
        value={value != undefined ? value : undefined}
        type={type ? type : "text"}
        placeholder={placeholder}
        {...conf}
        disabled={disabled ? disabled : undefined}
        required={required ? required : undefined}
      />
    </div>
  );
}

export default FieldHorizontal;
