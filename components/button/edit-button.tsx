import React from "react";

type Props = {
  edit: boolean;
  title?: string;
  toggleHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  formId?: string;
};

function EditButton({ edit, title, toggleHandler, formId }: Props) {
  return (
    <div className="flex flex-1 justify-end pr-2">
      <button
        className="whitespace-nowrap bg-[#fff] p-1 px-2 rounded"
        onClick={toggleHandler}
        form={formId ? formId : undefined}
      >
        {!edit ? "Done" : `Edit ${title}`}
      </button>
    </div>
  );
}

export default EditButton;
